import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import ProjectCard from '../ui/ProjectCard';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { initialProjects as defaultInitialProjects } from '../../data/projects';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
// Uncomment if GitHubRepoForm is to be used
// import GitHubRepoForm from '../features/GitHubRepoForm'; 

interface ProjectsSectionProps {
  initialProjects?: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ initialProjects = defaultInitialProjects }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const handleViewDetails = (project: Project) => {
    console.log('Opening modal for project:', project.name); // Debug log
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log('Closing modal'); // Debug log
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Uncomment and use this function if GitHubRepoForm is active
  // const handleProjectGenerated = (newProject: Project) => {
  //   setProjects(prevProjects => [newProject, ...prevProjects]);
  // };

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
        
        {/* Uncomment if GitHubRepoForm is to be used
        <GitHubRepoForm onProjectGenerated={handleProjectGenerated} /> 
        */}
        
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

      {/* Modal for project details */}
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
                {selectedProject.tags.map(tag => (
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
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
