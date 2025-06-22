import React from 'react';
import { Skill } from '../../types';

interface SkillBarProps {
  skill: Skill;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill }) => {
  return (
    <div className="bg-primary/10 dark:bg-primary/20 text-primary-dark dark:text-primary-light text-sm font-medium px-4 py-2 rounded-lg shadow-sm mb-3 w-full flex items-center justify-center">
      {skill.name}
    </div>
  );
};

export default SkillBar;
