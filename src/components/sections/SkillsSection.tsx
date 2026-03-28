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
    <section id="skills" ref={ref} className="py-16 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300 relative z-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
            My <span className="text-primary dark:text-primary-light">Skills</span>
          </h2>
          <p className="text-center text-base text-text-light/70 dark:text-text-dark/70 mb-10 max-w-xl mx-auto px-2">
            Technologies and tools I use to build engaging digital experiences.
          </p>
        </div>

        {/* Background Glowing Orbs */}
        <div className="absolute top-[30%] left-0 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none -z-10" />
        <div className="absolute top-[30%] right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[120px] opacity-50 pointer-events-none -z-10" />

        {/* Cards Grid — 1 col on mobile, 2 on md, 3 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10 w-full">
          {skillData.map((category: SkillCategory, index: number) => (
            <div
              key={category.name}
              onMouseMove={handleMouseMove}
              className={`group isolate bg-border-light/80 dark:bg-slate-800/80 relative p-[2px] rounded-3xl shadow-md dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(59,130,246,0.15)] overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: isVisible ? `${index * 120}ms` : '0ms' }}
            >
              {/* Glowing border tracker */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                  background: 'radial-gradient(350px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(59,130,246,0.85), transparent 40%)'
                }}
              />

              {/* Frosted glass inner */}
              <div className="absolute inset-[2px] rounded-[22px] bg-card-light/60 dark:bg-[#0d1424]/60 backdrop-blur-2xl pointer-events-none z-10" />

              {/* Inner spotlight */}
              <div
                className="pointer-events-none absolute inset-[2px] rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                style={{
                  background: 'radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(59,130,246,0.07), transparent 45%)'
                }}
              />

              {/* Content */}
              <div className="relative z-30 p-5 sm:p-6 flex flex-col items-center w-full">
                <h3 className="text-base sm:text-lg font-bold mb-5 text-text-light dark:text-slate-100 tracking-wide text-center group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
                  {category.name}
                </h3>
                <div className="flex flex-wrap justify-center gap-2 w-full">
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
