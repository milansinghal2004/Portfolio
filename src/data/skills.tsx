import { SkillCategory } from '../types';
import React from 'react'; // Import React for JSX in Skill icons



const PythonIcon = (): React.ReactNode => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 mr-2 text-blue-400">
    <path d="M12,2A10,10,0,0,0,2,12A10,10,0,0,0,12,22A10,10,0,0,0,22,12A10,10,0,0,0,12,2M10.5,17A1.5,1.5,0,0,1,9,15.5A1.5,1.5,0,0,1,10.5,14A1.5,1.5,0,0,1,12,15.5V17H10.5M10.5,12.5A1.5,1.5,0,0,1,9,11A1.5,1.5,0,0,1,10.5,9.5A1.5,1.5,0,0,1,12,11V12.5H10.5M15,17H13.5V15.5A1.5,1.5,0,0,1,15,14A1.5,1.5,0,0,1,16.5,15.5A1.5,1.5,0,0,1,15,17M15,12.5H13.5V11A1.5,1.5,0,0,1,15,9.5A1.5,1.5,0,0,1,16.5,11A1.5,1.5,0,0,1,15,12.5Z" />
  </svg>
);

const OpenCVIcon = (): React.ReactNode => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 mr-2 text-blue-600">
    <path d="M12,2A10,10,0,0,0,2,12A10,10,0,0,0,12,22A10,10,0,0,0,22,12A10,10,0,0,0,12,2M12,20A8,8,0,0,1,4,12A8,8,0,0,1,12,4A8,8,0,0,1,20,12A8,8,0,0,1,12,20Z"/>
  </svg>
);

export const skillCategories: SkillCategory[] = [
  {
    name: 'Machine Learning & CV',
    skills: [
      { id: 'ml1', name: 'Machine Learning', level: 95, icon: <PythonIcon /> },
      { id: 'ml5', name: 'YOLO (v5, v8, v11)', level: 95 },
      { id: 'ml4', name: 'Keras, Tensorflow, PyTorch', level: 90, icon: <OpenCVIcon /> },
      { id: 'ml12', name: 'Numpy, Pandas, Matplotlib', level: 95 },
      { id: 'ml9', name: 'Computer Vision', level: 90 },
      { id: 'ml10', name: 'Python', level: 95 },
    ],
  },
  {
    name: 'AI Agents & Automation',
    skills: [
      { id: 'ai1', name: 'AI Automations', level: 90 },
      { id: 'ai2', name: 'MCP Servers', level: 85 },
      { id: 'ai3', name: 'Agent-to-Agent', level: 85 },
      { id: 'ai4', name: 'LLM Integration', level: 90 },
      { id: 'ai5', name: 'N8n Workflows', level: 90 },
    ],
  },
  {
    name: 'Software & Tools',
    skills: [
      { id: 'dev8', name: 'Git & GitHub', level: 90 },
      { id: 'app4', name: 'VS Code', level: 95 },
      { id: 'app5', name: 'Photoshop, Illustrator', level: 90 },
      { id: 'app11', name: 'Google Workspace', level: 90 },
      { id: 'app1', name: 'Figma', level: 80 },
    ],
  },
];

// Debug: Log the exported data
console.log('Skills data exported:', skillCategories);
