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
          I design and develop modern web experiences that are intuitive, impactful, and powered by intelligent thinking.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div 
            className={`md:w-1/3 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            style={{transitionDelay: isVisible ? '200ms' : '0ms'}}
          >
            <img
              src="MyPic.jpg"
              alt="Developer Avatar"
              className="rounded-full shadow-2xl w-64 h-64 md:w-80 md:h-80 mx-auto object-cover border-4 border-primary dark:border-primary-light animate-pulse-subtle"
            />
          </div>
          <div 
            className={`md:w-2/3 space-y-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            style={{transitionDelay: isVisible ? '400ms' : '0ms'}}
          >
            <p className="text-lg leading-relaxed">
            I’m a creative technologist and final-year Computer Science undergraduate at UPES, blending the worlds of design, intelligent systems, and user-focused engineering. With a strong foundation in Python, frontend development, and UI/UX design, I craft digital solutions that are not just functional—but thoughtful, elegant, and impactful.
            </p>
            <p className="text-lg leading-relaxed">
            Currently interning at PwC Launchpad, I’ve applied automation tools like n8n and Google Gemini to streamline real-world workflows—reinforcing my belief that innovation is most powerful when it's practical. As part of the Board of Executives at UPES ACM and ACM-W Chapters, I’ve led design, content, and tech teams, fostering a culture of clarity, creativity, and collaboration.
            </p>
            <p className="text-lg leading-relaxed">
            From rapid prototyping in Figma to debugging deployment errors, I move fluidly between design thinking and technical precision. My approach is simple: build with intention, design for people, and grow through curiosity.
            </p>
            <p className="text-lg leading-relaxed">
            Let’s connect the dots between ideas and interfaces—and shape technology that feels intuitive, inclusive, and intelligent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
