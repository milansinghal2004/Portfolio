
import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const AboutSection: React.FC = () => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" ref={ref} className="py-20 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            About <span className="text-primary dark:text-primary-light">Me</span>
          </h2>
          <p className="text-center text-lg text-text-light/70 dark:text-text-dark/70 mb-12 max-w-3xl mx-auto">
            A passionate and results-driven software developer with experience in building and maintaining web applications using modern technologies.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div 
            className={`md:w-1/3 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            style={{transitionDelay: isVisible ? '200ms' : '0ms'}}
          >
            <img
              src="https://picsum.photos/seed/avatar/400/400?grayscale"
              alt="Developer Avatar"
              className="rounded-full shadow-2xl w-64 h-64 md:w-80 md:h-80 mx-auto object-cover border-4 border-primary dark:border-primary-light animate-pulse-subtle"
            />
          </div>
          <div 
            className={`md:w-2/3 space-y-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            style={{transitionDelay: isVisible ? '400ms' : '0ms'}}
          >
            <p className="text-lg leading-relaxed">
              Hello! I'm [Your Name], a software developer based in [Your City/Country]. My journey into tech started with a fascination for how software can solve real-world problems and enhance user experiences. I thrive on challenges and continuously seek to learn and master new tools and frameworks.
            </p>
            <p className="text-lg leading-relaxed">
              I specialize in frontend development using React and TypeScript, but I'm also proficient in backend technologies like Node.js and Python. I believe in writing clean, maintainable, and scalable code. My goal is to create applications that are not only functional but also aesthetically pleasing and intuitive to use.
            </p>
            <p className="text-lg leading-relaxed">
              When I'm not coding, I enjoy [Your Hobby 1], [Your Hobby 2], and exploring new technologies. I'm always open to collaborating on exciting projects and connecting with fellow developers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
    