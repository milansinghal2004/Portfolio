import React from 'react';
import Button from '../ui/Button';
import AnimatedText from '../ui/AnimatedText';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { socialLinks } from '../../data/socialLinks';

const HeroSection: React.FC = () => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="hero" ref={ref} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-light via-blue-50 to-indigo-100 dark:from-background-dark dark:via-slate-900 dark:to-indigo-900 text-center px-4 py-20 overflow-hidden">
      <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-text-light dark:text-text-dark">
          Hi, I'm <span className="text-primary dark:text-primary-light">Milan Singhal</span>
        </h1>
        <div className="text-2xl md:text-4xl text-secondary dark:text-secondary-light mb-8 h-12 md:h-16">
          <AnimatedText text="Code. Design. Connect." />
        </div>
        <p className="text-lg md:text-xl text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto mb-10">
        Crafting thoughtful digital experiences where intuitive design, intelligent systems, and innovative thinking meet bridging aesthetics with purpose to make technology feel effortless and human.
        </p>
        <div className="space-x-4 mb-8">
          <Button 
            href="#projects" 
            variant="primary" 
            size="lg"
            onClick={(e: React.MouseEvent<HTMLElement>) => { 
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="transform transition-transform duration-200 hover:scale-105"
          >
            View My Work
          </Button>
          <Button 
            href="#contact" 
            variant="outline" 
            size="lg"
            onClick={(e: React.MouseEvent<HTMLElement>) => { 
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="transform transition-transform duration-200 hover:scale-105"
          >
            Get In Touch
          </Button>
        </div>
        
        {/* Social Links */}
        <div className="flex justify-center space-x-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-text-light/70 dark:text-text-dark/70 transition-all duration-300 transform hover:scale-110 ${social.color}`}
              aria-label={social.name}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d={social.icon} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
