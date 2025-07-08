import React, { useState } from 'react';
import { Internship } from '../../data/internships';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

interface InternshipsSectionProps {
  internships?: Internship[];
}

const InternshipsSection: React.FC<InternshipsSectionProps> = ({ 
  internships = [] 
}) => {
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });

  const handleViewDetails = (internship: Internship) => {
    setSelectedInternship(internship);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInternship(null);
  };

  return (
    <section id="internships" ref={ref} className="py-20 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            My <span className="text-primary dark:text-primary-light">Experience</span>
          </h2>
          <p className="text-center text-lg text-text-light/70 dark:text-text-dark/70 mb-12 max-w-3xl mx-auto">
            Professional experiences and leadership roles that have shaped my journey in technology and innovation.
          </p>
        </div>

        {internships.length === 0 ? (
          <p className="text-center text-text-light/70 dark:text-text-dark/70">No internships to display yet.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {internships.map((internship, index) => (
              <div 
                key={internship.id} 
                className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{transitionDelay: isVisible ? `${index * 200 + 200}ms` : '0ms'}}
              >
                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group border border-border-light dark:border-border-dark">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-text-light dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors mb-1">
                          {internship.position}
                        </h3>
                        <p className="text-lg font-medium text-primary dark:text-primary-light">
                          {internship.company}
                        </p>
                      </div>
                      {internship.logo && (
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center ml-4">
                          <img 
                            src={internship.logo} 
                            alt={`Logo of ${internship.company}`}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center text-sm text-text-light/70 dark:text-text-dark/70 mb-3">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {internship.duration}
                    </div>
                    
                    <div className="flex items-center text-sm text-text-light/70 dark:text-text-dark/70 mb-4">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {internship.location}
                    </div>

                    <p className="text-sm text-text-light/80 dark:text-text-dark/80 mb-4 line-clamp-3">
                      {internship.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-text-light dark:text-text-dark mb-2">Key Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {internship.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="inline-block bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light text-xs font-medium px-2.5 py-0.5 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {internship.technologies.length > 4 && (
                          <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            +{internship.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button 
                        onClick={() => handleViewDetails(internship)} 
                        variant="primary" 
                        size="sm" 
                        className="flex-1 transition-all duration-200"
                      >
                        View Details
                      </Button>
                      {internship.companyUrl && (
                        <Button 
                          href={internship.companyUrl} 
                          variant="outline" 
                          size="sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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

      {/* Modal for internship details */}
      {selectedInternship && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`${selectedInternship.position} at ${selectedInternship.company}`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-light/70 dark:text-text-dark/70">
                  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {selectedInternship.duration}
                </p>
                <p className="text-sm text-text-light/70 dark:text-text-dark/70">
                  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {selectedInternship.location}
                </p>
              </div>
              {selectedInternship.logo && (
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <img 
                    src={selectedInternship.logo} 
                    alt={`Logo of ${selectedInternship.company}`}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              )}
            </div>

            <p className="text-text-light/90 dark:text-text-dark/90 leading-relaxed">
              {selectedInternship.description}
            </p>

            {/* Timeline Section for ACM */}
            {selectedInternship.timeline && selectedInternship.timeline.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-text-light dark:text-text-dark">Career Progression:</h4>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30 dark:bg-primary-light/30"></div>
                  
                  {selectedInternship.timeline.map((item, index) => (
                    <div key={index} className="relative flex items-start mb-4 last:mb-0">
                      {/* Timeline dot */}
                      <div className="absolute left-3 top-2 w-3 h-3 bg-primary dark:bg-primary-light rounded-full border-2 border-white dark:border-gray-800 z-10"></div>
                      
                      {/* Content */}
                      <div className="ml-8 flex-1">
                        <h5 className="font-semibold text-text-light dark:text-text-dark text-sm">
                          {item.title}
                        </h5>
                        <p className="text-xs text-text-light/70 dark:text-text-dark/70">
                          {item.period}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-semibold mb-2 text-text-light dark:text-text-dark">Key Achievements:</h4>
              <ul className="space-y-2">
                {selectedInternship.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-4 h-4 text-primary dark:text-primary-light mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-text-light/90 dark:text-text-dark/90">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-text-light dark:text-text-dark">Technologies & Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedInternship.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="inline-block bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {selectedInternship.companyUrl && (
              <div className="pt-4 border-t border-border-light dark:border-border-dark">
                <Button 
                  href={selectedInternship.companyUrl} 
                  variant="primary" 
                  size="md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Company Website
                </Button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
};

export default InternshipsSection; 