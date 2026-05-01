import React from 'react';
import { Project } from '../../types';
import Button from './Button';
import { getAssetUrl } from '../../utils/assetUrl';

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
      className="group isolate rounded-xl bg-card-light dark:bg-card-dark shadow-lg overflow-hidden flex flex-col h-full border border-border-light dark:border-border-dark
        motion-safe:transition-[box-shadow,transform,border-color] motion-safe:duration-300
        hover:shadow-2xl hover:-translate-y-1.5 hover:border-primary/40 dark:hover:border-primary-light/45
        active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none
        focus-within:border-primary/55 dark:focus-within:border-primary-light/55 focus-within:shadow-xl"
    >
      <div className="relative h-48 w-full overflow-hidden shrink-0">
        <img 
          src={project.imageUrl ? getAssetUrl(project.imageUrl) : 'https://picsum.photos/600/400?grayscale'} 
          alt={`Project: ${project.name}`} 
          className="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80 group-hover:opacity-100 motion-safe:transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <div className="bg-primary/95 dark:bg-primary-light/95 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium shadow-md motion-safe:transition-transform group-hover:scale-105">
            {project.tags.length} tech
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-text-light dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
          {project.name}
        </h3>
        <p className="text-sm text-text-light/80 dark:text-text-dark/80 mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="mt-auto">
          <div className="mb-3">
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
          <div className="space-y-2">
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
          </div> {/* end space-y-2 */}
        </div> {/* end mt-auto */}
      </div>
    </div>
  );
};

export default ProjectCard;
