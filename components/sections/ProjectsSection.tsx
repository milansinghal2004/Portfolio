
import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import ProjectCard from '../ui/ProjectCard';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { initialProjects as defaultInitialProjects } from '../../data/projects';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface ProjectsSectionProps {
  initialProjects?: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ initialProjects = defaultInitialProjects }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });


  useEffect(() => {
    // Potentially load projects from an API or localStorage here if needed in future
    // For now, we ensure that if initialProjects prop changes, the state updates.
    setProjects(initialProjects);
  }, [initialProjects]);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{transitionDelay: isVisible ? `${index * 100 + 200}ms` : '0ms'}} // Stagger animation
              >
                <ProjectCard project={project} onViewDetails={handleViewDetails} />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProject && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedProject.name}>
          <img 
            src={selectedProject.imageUrl || 'https://picsum.photos/600/400?grayscale'} 
            alt={selectedProject.name} 
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-text-light/90 dark:text-text-dark/90 mb-4">{selectedProject.description}</p>
          <div className="mb-4">
            <h4 className="font-semibold mb-1 text-text-light dark:text-text-dark">Technologies:</h4>
            {selectedProject.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-block bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex space-x-4 mt-6">
            {selectedProject.repoUrl && (
              <Button 
                href={selectedProject.repoUrl} // Use href for Button component
                variant="primary" 
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Repository
              </Button>
            )}
            {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
              <Button 
                href={selectedProject.liveUrl} // Use href for Button component
                variant="outline" 
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </Button>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ProjectsSection;