import React from 'react';
import { Project } from '../../types';
import Button from './Button';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onViewDetails(project);
  };

  return (
    <div 
      className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group flex flex-col h-full border border-border-light dark:border-border-dark"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={project.imageUrl || 'https://picsum.photos/600/400?grayscale'} 
          alt={project.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
        <div className="absolute top-4 right-4">
          <div className="bg-primary/90 dark:bg-primary-light/90 text-white px-2 py-1 rounded-full text-xs font-medium">
            {project.tags.length} tech
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-text-light dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
          {project.name}
        </h3>
        <p className="text-sm text-text-light/80 dark:text-text-dark/80 mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>
        <div className="mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>
        <div className="mt-auto space-y-2">
          <Button 
            onClick={handleViewDetails} 
            variant="primary" 
            size="sm" 
            className="w-full group-hover:scale-105 transition-transform duration-200"
          >
            View Details
          </Button>
          <div className="flex space-x-2">
            {project.repoUrl && project.repoUrl !== '#' && (
              <Button 
                href={project.repoUrl} 
                variant="outline" 
                size="sm" 
                className="flex-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Code
              </Button>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <Button 
                href={project.liveUrl} 
                variant="outline" 
                size="sm" 
                className="flex-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Demo
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
