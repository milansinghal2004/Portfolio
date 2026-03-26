import React from 'react';
import { SkillCategory } from '../../types';
import SkillBar from '../ui/SkillBar';
import { skillCategories } from '../../data/skills.tsx'; 
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface SkillsSectionProps {
  skillData?: SkillCategory[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skillData = skillCategories }) => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="skills" ref={ref} className="py-20 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300 relative z-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            My <span className="text-primary dark:text-primary-light">Skills</span>
          </h2>
          <p className="text-center text-lg text-text-light/70 dark:text-text-dark/70 mb-12 max-w-3xl mx-auto">
            Here's a snapshot of the technologies and tools I navigate to build engaging and intuitive digital experiences.
          </p>
        </div>
        
        {/* Background Glowing Orbs */}
        <div className="absolute top-[30%] left-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[140px] opacity-60 pointer-events-none -z-10"></div>
        <div className="absolute top-[30%] right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[140px] opacity-60 pointer-events-none -z-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 w-full">
          {skillData.map((category: SkillCategory, index: number) => (
            <div 
              key={category.name} 
              onMouseMove={handleMouseMove}
              className={`group isolate bg-border-light/80 dark:bg-slate-800/80 relative p-[2.5px] rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.2)] overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{transitionDelay: isVisible ? `${index * 150}ms` : '0ms'}}
            >
              {/* Outer Border Glowing Mouse Tracker */}
              <div 
                className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                  background: 'radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(59, 130, 246, 0.9), transparent 40%)'
                }}
              />
              
              {/* Inner Card Background Mask - Frosted Glass */}
              <div className="absolute inset-[2.5px] rounded-[29.5px] bg-card-light/60 dark:bg-[#0d1424]/60 backdrop-blur-2xl pointer-events-none z-10"></div>

              {/* Inner Spotlight Glow */}
              <div 
                className="pointer-events-none absolute inset-[2.5px] rounded-[29.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                style={{
                  background: 'radial-gradient(500px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(59, 130, 246, 0.08), transparent 45%)'
                }}
              />

              {/* Card Content Layer */}
              <div className="relative z-30 p-8 flex flex-col items-center w-full h-full">
                <h3 className="text-xl font-bold mb-8 text-text-light dark:text-slate-100 tracking-wide text-center group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
                  {category.name}
                </h3>
                <div className="flex flex-wrap justify-center gap-3 w-full">
                  {category.skills.map((skill: any) => (
                    <SkillBar key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
