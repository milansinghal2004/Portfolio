import React from 'react';
import { Publication } from '../../data/publications';
import Button from './Button';

interface PublicationCardProps {
  publication: Publication;
  onViewDetails: (publication: Publication) => void;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication, onViewDetails }) => {
  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onViewDetails(publication);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div 
      className="group isolate rounded-xl bg-card-light dark:bg-card-dark shadow-lg overflow-hidden flex flex-col h-full border border-border-light dark:border-border-dark
        motion-safe:transition-[box-shadow,transform,border-color] motion-safe:duration-300
        hover:shadow-2xl hover:-translate-y-1.5 hover:border-primary/40 dark:hover:border-primary-light/45
        active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none
        focus-within:border-primary/55 dark:focus-within:border-primary-light/55 focus-within:shadow-xl"
    >
      <div className="relative h-48 w-full overflow-hidden shrink-0 bg-white dark:bg-slate-800">
        {publication.pdfUrl ? (
          <div className="absolute inset-0 overflow-hidden bg-white">
            <iframe 
              src={`${publication.pdfUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH,9999`}
              title={`Preview of ${publication.title}`}
              className="absolute top-[-30px] left-[-15px] w-[900px] h-[1000px] origin-top-left scale-[0.42] sm:scale-[0.45] lg:scale-[0.46] pointer-events-none border-none bg-white z-0"
              scrolling="no"
              tabIndex={-1}
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 bg-slate-200 dark:bg-slate-800">
             <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
             </svg>
             <span className="text-sm font-medium">PDF Pending</span>
          </div>
        )}
        
        {/* Gradient overlay for readability and styling */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 group-hover:opacity-100 motion-safe:transition-opacity duration-300 pointer-events-none" />
        
        <div className="absolute top-3 right-3 pointer-events-none">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shadow-md motion-safe:transition-transform group-hover:scale-105 ${getStatusColor(publication.status)}`}>
            {publication.status.charAt(0).toUpperCase() + publication.status.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-text-light dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2" title={publication.title}>
          {publication.title}
        </h3>
        <p className="text-sm text-text-light/80 dark:text-text-dark/80 mb-4 line-clamp-3">
          {publication.description}
        </p>
        <div className="mt-auto">
          <div className="mb-3">
            {publication.keywords.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
            {publication.keywords.length > 3 && (
              <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                +{publication.keywords.length - 3} more
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
              Read Paper
            </Button>
            <div className="flex space-x-2">
              {publication.url && (
                <Button 
                  href={publication.url} 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Journal Link
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;
