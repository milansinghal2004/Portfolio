import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Project } from '../../types';
import ProjectCard from '../ui/ProjectCard';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { initialProjects as defaultInitialProjects } from '../../data/projects';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
// Uncomment if GitHubRepoForm is to be used
// import GitHubRepoForm from '../features/GitHubRepoForm';

const CARD_WIDTH =
  'w-[min(88vw,380px)] sm:w-[min(42vw,380px)] lg:w-[min(32vw,400px)]';

interface ProjectsSectionProps {
  initialProjects?: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ initialProjects = defaultInitialProjects }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
  
  // Marquee pause state
  const [marqueePaused, setMarqueePaused] = useState(false);
  const resumeMarqueeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dragging state and refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  useEffect(() => {
    return () => {
      if (resumeMarqueeTimer.current) clearTimeout(resumeMarqueeTimer.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Auto-scrolling logic
  const autoScroll = useCallback(() => {
    if (scrollRef.current && !marqueePaused && !isDown && isVisible) {
      scrollRef.current.scrollLeft += 1; // Animation speed

      // Loop trick: if we've scrolled past the first set of items, snap back instantly
      if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
        scrollRef.current.scrollLeft -= scrollRef.current.scrollWidth / 2;
      }
    }
    rafRef.current = requestAnimationFrame(autoScroll);
  }, [marqueePaused, isDown, isVisible]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(autoScroll);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [autoScroll]);

  // Drag Handlers
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDown(true);
    setHasDragged(false);
    if (scrollRef.current) {
      const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
      setStartX(pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const onDragEnd = () => {
    setIsDown(false);
  };

  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault(); // Prevent text selection while dragging
    setHasDragged(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const x = pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    
    let newScrollLeft = scrollLeft - walk;
    
    // Handle infinite scrolling backward and forward during drag
    const halfWidth = scrollRef.current.scrollWidth / 2;
    if (newScrollLeft < 0) {
      newScrollLeft += halfWidth;
      // Adjust startX and scrollLeft so the relative drag continues smoothly
      setStartX(x);
      setScrollLeft(newScrollLeft);
    } else if (newScrollLeft >= halfWidth) {
      newScrollLeft -= halfWidth;
      setStartX(x);
      setScrollLeft(newScrollLeft);
    }
    
    scrollRef.current.scrollLeft = newScrollLeft;
  };

  const handleViewDetails = (project: Project) => {
    if (hasDragged) return; // Prevent clicking when trying to drag
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const onCardPointerEnter = () => {
    if (resumeMarqueeTimer.current) {
      clearTimeout(resumeMarqueeTimer.current);
      resumeMarqueeTimer.current = null;
    }
    setMarqueePaused(true);
  };

  const onCardPointerLeave = () => {
    resumeMarqueeTimer.current = setTimeout(() => {
      setMarqueePaused(false);
      resumeMarqueeTimer.current = null;
    }, 100);
  };

  const renderCard = (project: Project, key: string) => (
    <div
      key={key}
      role="listitem"
      className={`shrink-0 ${CARD_WIDTH}`}
      onPointerEnter={onCardPointerEnter}
      onPointerLeave={onCardPointerLeave}
    >
      <ProjectCard project={project} onViewDetails={handleViewDetails} />
    </div>
  );

  return (
    <section id="projects" ref={ref} className="py-20 bg-gray-50 dark:bg-slate-800 text-text-light dark:text-text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            My <span className="text-primary dark:text-primary-light">Projects</span>
          </h2>
          <p className="text-center text-lg text-text-light/70 dark:text-text-dark/70 mb-12 max-w-3xl mx-auto">
            A selection of projects I've worked on. Explore them to see my skills in action.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-text-light/70 dark:text-text-dark/70">No projects to display yet.</p>
        ) : (
          <div
            className={`relative w-full overflow-hidden pb-2 pt-1 transition-opacity duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-[15] w-12 sm:w-20 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent dark:from-slate-800 dark:via-slate-800/90"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-[15] w-12 sm:w-20 bg-gradient-to-l from-gray-50 via-gray-50/90 to-transparent dark:from-slate-800 dark:via-slate-800/90"
              aria-hidden
            />

            {/*
              Two identical sets of items allowing seamless looping when scrollLeft hits 50%.
            */}
            <div
              ref={scrollRef}
              className={`flex w-full items-stretch overflow-x-hidden ${isDown ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
              onMouseDown={onDragStart}
              onMouseLeave={onDragEnd}
              onMouseUp={onDragEnd}
              onMouseMove={onDragMove}
              onTouchStart={onDragStart}
              onTouchEnd={onDragEnd}
              onTouchMove={onDragMove}
              role="list"
              aria-label="Projects"
            >
              <div className="flex shrink-0 gap-6 lg:gap-8 pr-6 lg:pr-8">
                {projects.map((project) => renderCard(project, project.id))}
              </div>
              <div className="flex shrink-0 gap-6 lg:gap-8 pr-6 lg:pr-8 border-l border-transparent">
                {projects.map((project) => renderCard(project, `${project.id}-dup`))}
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedProject && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedProject.name}>
          <div className="space-y-4">
            <img
              src={selectedProject.imageUrl || 'https://picsum.photos/600/400?grayscale'}
              alt={`Project: ${selectedProject.name}`}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-text-light/90 dark:text-text-dark/90 mb-4 leading-relaxed">
              {selectedProject.description}
            </p>
            <div className="mb-4">
              <h4 className="font-semibold mb-2 text-text-light dark:text-text-dark">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border-light dark:border-border-dark">
              {selectedProject.repoUrl && selectedProject.repoUrl !== '#' && (
                <Button
                  href={selectedProject.repoUrl}
                  variant="primary"
                  size="md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View Repository
                </Button>
              )}
              {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                <Button
                  href={selectedProject.liveUrl}
                  variant="outline"
                  size="md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ProjectsSection;
