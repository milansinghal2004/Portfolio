
import React, { useEffect, useState } from 'react';
import { Skill } from '../../types';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface SkillBarProps {
  skill: Skill;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill }) => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.5, triggerOnce: true });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setWidth(skill.level);
    }
  }, [isVisible, skill.level]);

  return (
    <div ref={ref} className="mb-4 opacity-0 animate-fadeInUp" style={{ animationDelay: `${Math.random() * 0.5}s` }}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center text-sm font-medium text-text-light dark:text-text-dark">
          {skill.icon && <span className="mr-2 text-primary dark:text-primary-light">{skill.icon}</span>}
          {skill.name}
        </div>
        <span className="text-xs font-semibold text-primary dark:text-primary-light">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-secondary to-primary h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
    