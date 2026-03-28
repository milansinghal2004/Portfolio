import React, { useState } from 'react';
import { Internship } from '../../data/internships';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

interface InternshipsSectionProps {
  internships?: Internship[];
}

// PwC = orange, Quality AI = white, Cosmofleet = golden, ACM = electric blue
const ACCENT_COLORS = [
  { border: '#f97316', tag: 'rgba(249,115,22,0.15)',  tagText: '#fdba74' },
  { border: '#e2e8f0', tag: 'rgba(226,232,240,0.10)', tagText: '#cbd5e1' },
  { border: '#eab308', tag: 'rgba(234,179,8,0.15)',   tagText: '#fde047' },
  { border: '#00b4ff', tag: 'rgba(0,180,255,0.15)',   tagText: '#7dd3fc' },
];

const InternshipsSection: React.FC<InternshipsSectionProps> = ({ internships = [] }) => {
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.05, triggerOnce: true });

  const handleViewDetails = (internship: Internship) => {
    setSelectedInternship(internship);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInternship(null);
  };

  return (
    <section id="internships" ref={ref} className="py-16 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
            My <span className="text-primary dark:text-primary-light">Experience</span>
          </h2>
          <p className="text-center text-base text-text-light/70 dark:text-text-dark/70 mb-10 max-w-2xl mx-auto">
            Professional experiences and leadership roles that have shaped my journey in technology and innovation.
          </p>
        </div>

        {internships.length === 0 ? (
          <p className="text-center text-text-light/70 dark:text-text-dark/70">No internships to display yet.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {internships.map((internship, index) => {
              const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
              return (
                <div
                  key={internship.id}
                  className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: isVisible ? `${index * 150 + 100}ms` : '0ms' }}
                >
                  <div
                    className="relative h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 group flex flex-col"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${accent.border}60`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.2)'; }}
                  >
                    {/* Accent left border */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                      style={{ background: `linear-gradient(to bottom, ${accent.border}, ${accent.border}60)` }}
                    />

                    <div className="p-5 pl-6 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-0.5">
                            {internship.position}
                          </h3>
                          <p className="text-sm font-semibold" style={{ color: accent.border }}>
                            {internship.company}
                          </p>
                        </div>
                        {internship.logo && (
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center ml-3 flex-shrink-0"
                            style={{ background: 'rgba(255,255,255,0.07)' }}
                          >
                            <img src={internship.logo} alt={`${internship.company} logo`} className="w-7 h-7 object-contain" />
                          </div>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-light/50 dark:text-text-dark/50 mb-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {internship.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {internship.location}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-text-light/70 dark:text-text-dark/70 mb-3 line-clamp-2 leading-relaxed">
                        {internship.description}
                      </p>

                      {/* Tags + Button anchored together at bottom */}
                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {internship.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                              style={{ background: accent.tag, color: accent.tagText }}
                            >
                              {tech}
                            </span>
                          ))}
                          {internship.technologies.length > 4 && (
                            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/5 text-text-light/40 dark:text-text-dark/40">
                              +{internship.technologies.length - 4} more
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetails(internship)}
                            className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 text-text-light/90 dark:text-text-dark/90 hover:text-text-light dark:hover:text-text-dark"
                            style={{
                              background: `linear-gradient(135deg, ${accent.border}25, ${accent.border}10)`,
                              border: `1px solid ${accent.border}35`,
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `linear-gradient(135deg, ${accent.border}45, ${accent.border}25)`; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `linear-gradient(135deg, ${accent.border}25, ${accent.border}10)`; }}
                          >
                            View Details
                          </button>
                          {internship.companyUrl && (
                            <a
                              href={internship.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 text-text-light/40 dark:text-text-dark/40 hover:text-text-light dark:hover:text-text-dark"
                              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedInternship && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`${selectedInternship.position} at ${selectedInternship.company}`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-light/70 dark:text-text-dark/70 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {selectedInternship.duration}
                </p>
                <p className="text-sm text-text-light/70 dark:text-text-dark/70 flex items-center gap-1 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {selectedInternship.location}
                </p>
              </div>
              {selectedInternship.logo && (
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <img src={selectedInternship.logo} alt={`Logo of ${selectedInternship.company}`} className="w-12 h-12 object-contain" />
                </div>
              )}
            </div>

            <p className="text-text-light/90 dark:text-text-dark/90 leading-relaxed">{selectedInternship.description}</p>

            {selectedInternship.timeline && selectedInternship.timeline.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-text-light dark:text-text-dark">Career Progression:</h4>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30 dark:bg-primary-light/30" />
                  {selectedInternship.timeline.map((item, index) => (
                    <div key={index} className="relative flex items-start mb-4 last:mb-0">
                      <div className="absolute left-3 top-2 w-3 h-3 bg-primary dark:bg-primary-light rounded-full border-2 border-white dark:border-gray-800 z-10" />
                      <div className="ml-8 flex-1">
                        <h5 className="font-semibold text-text-light dark:text-text-dark text-sm">{item.title}</h5>
                        <p className="text-xs text-text-light/70 dark:text-text-dark/70">{item.period}</p>
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
                  <span key={tech} className="inline-block bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light text-sm font-medium px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {selectedInternship.companyUrl && (
              <div className="pt-4 border-t border-border-light dark:border-border-dark">
                <Button href={selectedInternship.companyUrl} variant="primary" size="md" target="_blank" rel="noopener noreferrer" className="w-full">
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