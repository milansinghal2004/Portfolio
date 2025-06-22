
import React from 'react';
import { Project } from '../../types';
import Button from './Button';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  return (
    <div 
      className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group flex flex-col h-full"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={project.imageUrl || 'https://picsum.photos/600/400?grayscale'} 
          alt={project.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-text-light dark:text-text-dark">{project.name}</h3>
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
        </div>
        <div className="mt-auto">
          <Button onClick={() => onViewDetails(project)} variant="outline" size="sm" className="w-full">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
    