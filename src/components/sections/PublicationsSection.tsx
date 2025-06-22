import React, { useState } from 'react';
import { Publication } from '../../data/publications';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

interface PublicationsSectionProps {
  publications?: Publication[];
}

const PublicationsSection: React.FC<PublicationsSectionProps> = ({ 
  publications = [] 
}) => {
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });

  const handleViewDetails = (publication: Publication) => {
    setSelectedPublication(publication);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPublication(null);
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'journal':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'conference':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'research':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  return (
    <section id="publications" ref={ref} className="py-20 bg-gray-50 dark:bg-slate-800 text-text-light dark:text-text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Research & <span className="text-primary dark:text-primary-light">Publications</span>
          </h2>
          <p className="text-center text-lg text-text-light/70 dark:text-text-dark/70 mb-12 max-w-3xl mx-auto">
            Academic research and publications contributing to the advancement of technology and innovation.
          </p>
        </div>

        {publications.length === 0 ? (
          <p className="text-center text-text-light/70 dark:text-text-dark/70">No publications to display yet.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {publications.map((publication, index) => (
              <div 
                key={publication.id} 
                className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{transitionDelay: isVisible ? `${index * 200 + 200}ms` : '0ms'}}
              >
                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group border border-border-light dark:border-border-dark">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="text-primary dark:text-primary-light">
                            {getTypeIcon(publication.type)}
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(publication.status)}`}>
                            {publication.status.charAt(0).toUpperCase() + publication.status.slice(1)}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                          {publication.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-text-light/70 dark:text-text-dark/70 mb-3">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {publication.authors.join(', ')}
                    </div>
                    
                    <div className="flex items-center text-sm text-text-light/70 dark:text-text-dark/70 mb-4">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {publication.year}
                      {publication.journal && (
                        <span className="ml-2">• {publication.journal}</span>
                      )}
                      {publication.conference && (
                        <span className="ml-2">• {publication.conference}</span>
                      )}
                    </div>

                    <p className="text-sm text-text-light/80 dark:text-text-dark/80 mb-4 line-clamp-3">
                      {publication.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-text-light dark:text-text-dark mb-2">Keywords:</h4>
                      <div className="flex flex-wrap gap-2">
                        {publication.keywords.slice(0, 4).map((keyword) => (
                          <span
                            key={keyword}
                            className="inline-block bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light text-xs font-medium px-2.5 py-0.5 rounded-full"
                          >
                            {keyword}
                          </span>
                        ))}
                        {publication.keywords.length > 4 && (
                          <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            +{publication.keywords.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button 
                        onClick={() => handleViewDetails(publication)} 
                        variant="primary" 
                        size="sm" 
                        className="flex-1"
                      >
                        View Details
                      </Button>
                      {publication.pdfUrl && (
                        <Button 
                          href={publication.pdfUrl} 
                          variant="outline" 
                          size="sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for publication details */}
      {selectedPublication && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedPublication.title}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-primary dark:text-primary-light">
                  {getTypeIcon(selectedPublication.type)}
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedPublication.status)}`}>
                  {selectedPublication.status.charAt(0).toUpperCase() + selectedPublication.status.slice(1)}
                </span>
              </div>
              <div className="text-sm text-text-light/70 dark:text-text-dark/70">
                {selectedPublication.year}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-text-light dark:text-text-dark">Authors:</h4>
              <p className="text-text-light/90 dark:text-text-dark/90">{selectedPublication.authors.join(', ')}</p>
            </div>

            {selectedPublication.journal && (
              <div>
                <h4 className="font-semibold mb-2 text-text-light dark:text-text-dark">Journal:</h4>
                <p className="text-text-light/90 dark:text-text-dark/90">{selectedPublication.journal}</p>
              </div>
            )}

            {selectedPublication.conference && (
              <div>
                <h4 className="font-semibold mb-2 text-text-light dark:text-text-dark">Conference:</h4>
                <p className="text-text-light/90 dark:text-text-dark/90">{selectedPublication.conference}</p>
              </div>
            )}

            <div>
              <h4 className="font-semibold mb-2 text-text-light dark:text-text-dark">Abstract:</h4>
              <p className="text-text-light/90 dark:text-text-dark/90 leading-relaxed">
                {selectedPublication.abstract}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-text-light dark:text-text-dark">Keywords:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedPublication.keywords.map((keyword) => (
                  <span 
                    key={keyword} 
                    className="inline-block bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {selectedPublication.impact && (
              <div>
                <h4 className="font-semibold mb-2 text-text-light dark:text-text-dark">Impact:</h4>
                <p className="text-text-light/90 dark:text-text-dark/90">{selectedPublication.impact}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border-light dark:border-border-dark">
              {selectedPublication.url && (
                <Button 
                  href={selectedPublication.url} 
                  variant="primary" 
                  size="md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Paper
                </Button>
              )}
              {selectedPublication.pdfUrl && (
                <Button 
                  href={selectedPublication.pdfUrl} 
                  variant="outline" 
                  size="md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default PublicationsSection; 