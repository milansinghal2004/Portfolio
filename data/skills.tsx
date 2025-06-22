
import { SkillCategory } from '../types';
import React from 'react'; // Import React for JSX in Skill icons

// Example SVG Icons (replace with actual icons or a library)
const ReactIcon = (): React.ReactNode => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.29-8.71L12 16.59l5.29-5.3-1.41-1.41L12 13.76l-3.88-3.88-1.41 1.41z"/>
  </svg>
);

const NodeJSIcon = (): React.ReactNode => (
 <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 mr-2 text-green-500">
    <path d="M20.22,19.38L18,17.15a2.53,2.53,0,0,0,.35-1.24A2.53,2.53,0,0,0,18,14.67l2.22-2.23.89.89L18.89,15.56a2.47,2.47,0,0,0,0,1.78l2.22,2.23ZM11.11,2.05A.89.89,0,0,0,10.5,2H4.44A.89.89,0,0,0,3.56,2.9V19.1a.89.89,0,0,0,.89.89h16a.89.89,0,0,0,.89-.89V10.11a.89.89,0,0,0-.26-.63L11.74,2.31A.89.89,0,0,0,11.11,2.05ZM5.33,18.22V3.78h4.59l6.22,6.22v8.22Z"/>
  </svg>
);

const PythonIcon = (): React.ReactNode => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 mr-2 text-blue-400">
    <path d="M12,2A10,10,0,0,0,2,12A10,10,0,0,0,12,22A10,10,0,0,0,22,12A10,10,0,0,0,12,2M10.5,17A1.5,1.5,0,0,1,9,15.5A1.5,1.5,0,0,1,10.5,14A1.5,1.5,0,0,1,12,15.5V17H10.5M10.5,12.5A1.5,1.5,0,0,1,9,11A1.5,1.5,0,0,1,10.5,9.5A1.5,1.5,0,0,1,12,11V12.5H10.5M15,17H13.5V15.5A1.5,1.5,0,0,1,15,14A1.5,1.5,0,0,1,16.5,15.5A1.5,1.5,0,0,1,15,17M15,12.5H13.5V11A1.5,1.5,0,0,1,15,9.5A1.5,1.5,0,0,1,16.5,11A1.5,1.5,0,0,1,15,12.5Z" />
  </svg>
);


export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { id: 'fe1', name: 'React', level: 90, icon: <ReactIcon /> },
      // Placeholder icon for TypeScript
      { id: 'fe2', name: 'TypeScript', level: 85, icon: <ReactIcon /> },
      // Placeholder icon for Tailwind CSS
      { id: 'fe3', name: 'Tailwind CSS', level: 95, icon: <ReactIcon /> },
      // Placeholder icon for Next.js
      { id: 'fe4', name: 'Next.js', level: 75, icon: <ReactIcon /> },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { id: 'be1', name: 'Node.js', level: 85, icon: <NodeJSIcon /> },
      { id: 'be2', name: 'Python (Flask/Django)', level: 70, icon: <PythonIcon /> },
      { id: 'be3', name: 'SQL (PostgreSQL)', level: 80 },
      { id: 'be4', name: 'NoSQL (MongoDB)', level: 75 },
    ],
  },
  {
    name: 'Tools & Others',
    skills: [
      { id: 't1', name: 'Git & GitHub', level: 90 },
      { id: 't2', name: 'Docker', level: 70 },
      { id: 't4', name: 'UI/UX Design (Figma)', level: 65 },
    ],
  },
];