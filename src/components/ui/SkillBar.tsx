import React from 'react';
import { Skill } from '../../types';

interface SkillBarProps {
  skill: Skill;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill }) => {
  return (
    <div className="flex items-center justify-center px-4 py-2 bg-card-light dark:bg-card-dark border-2 border-border-light dark:border-border-dark rounded-lg shadow-sm group-hover/cat:border-emerald-400/60 group-hover/cat:shadow-[0_0_20px_rgba(52,211,153,0.25)] group-hover/cat:-translate-y-0.5 transition-all duration-300 cursor-default w-auto">
      <span className="text-xs md:text-sm font-semibold text-text-light dark:text-text-dark group-hover/cat:text-emerald-600 dark:group-hover/cat:text-emerald-400 uppercase tracking-widest leading-snug text-center transition-colors">
        {skill.name}
      </span>
    </div>
  );
};

export default SkillBar;
