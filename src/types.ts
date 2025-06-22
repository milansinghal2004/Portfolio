export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // Percentage 0-100
  icon?: React.ReactNode; 
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}
