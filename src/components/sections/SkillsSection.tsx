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

  return (
    <section id="skills" ref={ref} className="py-20 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            My <span className="text-primary dark:text-primary-light">Skills</span>
          </h2>
          <p className="text-center text-lg text-text-light/70 dark:text-text-dark/70 mb-12 max-w-3xl mx-auto">
            Here's a snapshot of the technologies and tools I work with. I'm always eager to learn and expand my skillset.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillData.map((category: SkillCategory, index: number) => (
            <div 
              key={category.name} 
              className={`bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-lg transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{transitionDelay: isVisible ? `${index * 150}ms` : '0ms'}}
            >
              <h3 className="text-xl font-semibold mb-6 text-primary dark:text-primary-light text-center">{category.name}</h3>
              <div>
                {category.skills.map((skill) => (
                  <SkillBar key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
