import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Publication, publications as defaultPublications } from '../../data/publications';
import PublicationCard from '../ui/PublicationCard';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const CARD_WIDTH = 'w-[min(88vw,380px)] sm:w-[min(42vw,380px)] lg:w-[min(32vw,400px)]';

interface PublicationsSectionProps {
  publications?: Publication[];
}

const PublicationsSection: React.FC<PublicationsSectionProps> = ({ 
  publications: initialPublications = defaultPublications 
}) => {
  const [publications, setPublications] = useState<Publication[]>(initialPublications);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
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
  const [startPageX, setStartPageX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const exactScrollLeft = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setPublications(initialPublications);
  }, [initialPublications]);

  useEffect(() => {
    return () => {
      if (resumeMarqueeTimer.current) clearTimeout(resumeMarqueeTimer.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Auto-scrolling logic
  const autoScroll = useCallback(() => {
    if (scrollRef.current && !marqueePaused && !isDown && isVisible) {
      // Sync exact floating point ref if user dragged manually
      if (Math.abs(exactScrollLeft.current - scrollRef.current.scrollLeft) > 5) {
        exactScrollLeft.current = scrollRef.current.scrollLeft;
      }
      
      exactScrollLeft.current -= 0.5; // Smooth fractional animation speed, reverse direction

      // Loop trick: if we scroll backwards past 0, jump to the middle seamlessly
      if (exactScrollLeft.current <= 0 && scrollRef.current.scrollWidth > 0) {
        exactScrollLeft.current += scrollRef.current.scrollWidth / 2;
      }

      scrollRef.current.scrollLeft = exactScrollLeft.current;
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
      setStartPageX(pageX);
      setStartX(pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const onDragEnd = () => {
    setIsDown(false);
  };

  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDown || !scrollRef.current) return;
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    
    // Ignore tiny accidental moves (less than 5px) to prevent overriding clicks
    if (!hasDragged && Math.abs(pageX - startPageX) < 5) return;
    
    e.preventDefault(); // Prevent text selection while dragging
    setHasDragged(true);
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

  const handleViewDetails = (publication: Publication) => {
    if (hasDragged) return; // Prevent clicking when trying to drag
    setSelectedPublication(publication);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPublication(null);
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

  const renderCard = (publication: Publication, key: string) => (
    <div
      key={key}
      role="listitem"
      className={`shrink-0 ${CARD_WIDTH}`}
      onPointerEnter={onCardPointerEnter}
      onPointerLeave={onCardPointerLeave}
    >
      <PublicationCard publication={publication} onViewDetails={handleViewDetails} />
    </div>
  );

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
          <div
            className={`relative w-full overflow-hidden pb-4 pt-4 transition-opacity duration-700 ${
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

            <div
              ref={scrollRef}
              className={`flex w-full items-stretch overflow-x-hidden p-2 ${isDown ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
              onMouseDown={onDragStart}
              onMouseLeave={onDragEnd}
              onMouseUp={onDragEnd}
              onMouseMove={onDragMove}
              onTouchStart={onDragStart}
              onTouchEnd={onDragEnd}
              onTouchMove={onDragMove}
              role="list"
              aria-label="Publications"
            >
              <div className="flex shrink-0 gap-6 lg:gap-8 pr-6 lg:pr-8">
                {publications.map((publication) => renderCard(publication, publication.id))}
              </div>
              <div className="flex shrink-0 gap-6 lg:gap-8 pr-6 lg:pr-8 border-l border-transparent">
                {publications.map((publication) => renderCard(publication, `${publication.id}-dup`))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for publication details */}
      {selectedPublication && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedPublication.title} maxWidthClass="max-w-4xl lg:max-w-6xl">
          <div className="space-y-4">
            {selectedPublication.pdfUrl ? (
               <iframe 
                 src={`${selectedPublication.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                 title={`Full PDF of ${selectedPublication.title}`}
                 className="w-full h-[65vh] md:h-[75vh] border border-border-light dark:border-border-dark rounded-lg mb-4 bg-white"
                 scrolling="yes"
               />
            ) : (
              <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 flex flex-col items-center justify-center rounded-lg mb-4 text-slate-500">
                <span>PDF not provided yet.</span>
              </div>
            )}
            
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

            <div>
              <h4 className="font-semibold mb-2 text-text-light dark:text-text-dark">Abstract:</h4>
              <p className="text-text-light/90 dark:text-text-dark/90 leading-relaxed">
                {selectedPublication.abstract}
              </p>
            </div>

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
                  Journal Link
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
                  Direct PDF Download
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