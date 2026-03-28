import React from 'react';
import { Skill } from '../../types';

interface SkillBarProps {
  skill: Skill;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill }) => {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-background-light dark:bg-[#151e32] text-text-light dark:text-slate-300 text-xs font-semibold rounded-xl border border-border-light dark:border-slate-700/50 hover:text-text-dark dark:hover:text-white hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-[0_0_16px_rgba(59,130,246,0.2)] hover:-translate-y-0.5 cursor-default z-30 whitespace-nowrap">
      {skill.icon && (
        <span className="opacity-90 flex items-center justify-center">
          {skill.icon}
        </span>
      )}
      <span className="tracking-wide">{skill.name}</span>
    </div>
  );
};

export default SkillBar;
