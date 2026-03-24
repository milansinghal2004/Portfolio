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
    <section id="skills" ref={ref} className="py-20 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-sans overflow-hidden relative">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        <div className="relative w-full flex flex-col items-center">
          
          {/* Main Global Trunk Line (Bark) */}
          <div className="absolute top-[60px] bottom-0 left-[24px] md:left-1/2 md:-translate-x-1/2 w-1.5 bg-gradient-to-b from-amber-900 via-amber-950/60 to-transparent rounded-full z-0 shadow-[0_0_15px_rgba(120,53,15,0.4)]"></div>

          {/* Top Node */}
          <div className="px-8 py-4 bg-card-light dark:bg-card-dark border-2 border-amber-900/80 shadow-[0_0_20px_rgba(120,53,15,0.3)] z-20 rounded-xl mb-16 relative">
            <h2 className="text-xl md:text-3xl font-black tracking-widest text-amber-800 dark:text-amber-700 uppercase text-center relative z-10">
              Tech Tree
            </h2>
          </div>

          {/* Categories clustered down the trunk */}
          <div className="w-full flex flex-col relative z-10 pb-20">
            {skillData.map((category, index) => {
              const isLeftDesktop = index % 2 !== 0; // index 0 goes Right, 1 goes Left, 2 goes Right

              return (
                <div key={category.name} className={`relative flex items-stretch w-full group/cat z-10 py-4 md:py-6 ${index > 0 ? 'md:-mt-4 lg:-mt-8' : ''}`}>
                  
                  {/* Mobile Trunk Dot */}
                  <div className="md:hidden absolute left-[24px] top-[24px] -translate-x-[5px] w-3.5 h-3.5 rounded-full bg-card-light dark:bg-card-dark border-[3px] border-amber-950 z-10 group-hover/cat:bg-amber-700 group-hover/cat:border-amber-700 group-hover/cat:shadow-[0_0_15px_rgba(146,64,14,0.8)] transition-all"></div>
                  
                  {/* Mobile connection line */}
                  <div className="md:hidden absolute left-[24px] top-[24px] h-[3px] w-6 bg-amber-950/30 dark:bg-amber-950/40 group-hover/cat:bg-amber-800/80 group-hover/cat:shadow-[0_0_10px_rgba(146,64,14,0.6)] transition-all -z-10"></div>

                  {/* Desktop Trunk Dot (Anchored center) */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-card-light dark:bg-card-dark border-[3px] border-amber-950 z-10 group-hover/cat:bg-amber-700 group-hover/cat:border-amber-700 group-hover/cat:shadow-[0_0_20px_rgba(146,64,14,0.8)] group-hover/cat:scale-125 transition-all duration-300"></div>

                  {/* Desktop View Wrapper */}
                  <div className="hidden md:flex w-full items-center relative gap-8">
                     
                     {/* Left Side (Empty if Right, Content if Left) */}
                     <div className={`w-1/2 flex items-center justify-end ${!isLeftDesktop ? 'hidden' : ''}`}>
                        {/* The Cluster Box */}
                        <div className="flex flex-col items-end">
                           <h3 className="text-xl font-bold tracking-wide uppercase mb-4 text-right">
                             {category.name}
                           </h3>
                           <div className="flex flex-wrap justify-end gap-3 max-w-lg">
                             {category.skills.map((skill: any) => <SkillBar key={skill.id} skill={skill} />)}
                           </div>
                        </div>
                        {/* Connecting Line to Trunk */}
                        <div className="h-[3px] w-12 xl:w-20 bg-amber-950/30 dark:bg-amber-950/40 ml-4 group-hover/cat:bg-amber-800/80 group-hover/cat:shadow-[0_0_15px_rgba(146,64,14,0.6)] transition-all duration-300"></div>
                     </div>

                     <div className={`w-1/2 ${!isLeftDesktop ? 'hidden' : ''}`}></div>
                     <div className={`w-1/2 ${isLeftDesktop ? 'hidden' : ''}`}></div>

                     {/* Right Side (Content if Right, Empty if Left) */}
                     <div className={`w-1/2 flex items-center justify-start ${isLeftDesktop ? 'hidden' : ''}`}>
                        {/* Connecting Line to Trunk */}
                        <div className="h-[3px] w-12 xl:w-20 bg-amber-950/30 dark:bg-amber-950/40 mr-4 group-hover/cat:bg-amber-800/80 group-hover/cat:shadow-[0_0_15px_rgba(146,64,14,0.6)] transition-all duration-300"></div>
                        
                        {/* The Cluster Box */}
                        <div className="flex flex-col items-start">
                           <h3 className="text-xl font-bold tracking-wide uppercase mb-4 text-left">
                             {category.name}
                           </h3>
                           <div className="flex flex-wrap justify-start gap-3 max-w-lg">
                             {category.skills.map((skill: any) => <SkillBar key={skill.id} skill={skill} />)}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Mobile View Wrapper */}
                  <div className="md:hidden w-full flex flex-col justify-start pl-[52px] pr-4 pt-3">
                     <h3 className="text-lg font-bold tracking-wide uppercase mb-4">
                       {category.name}
                     </h3>
                     <div className="flex flex-wrap gap-2.5">
                       {category.skills.map((skill: any) => <SkillBar key={skill.id} skill={skill} />)}
                     </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
