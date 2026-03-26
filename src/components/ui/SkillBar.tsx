import React from 'react';
import { Skill } from '../../types';

interface SkillBarProps {
  skill: Skill;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill }) => {
  return (
    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-background-light dark:bg-[#151e32] text-text-light dark:text-slate-300 text-xs md:text-sm font-semibold rounded-xl border border-border-light dark:border-slate-700/50 hover:text-text-dark dark:hover:text-white hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:-translate-y-1 cursor-default z-30">
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
