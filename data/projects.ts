
import { Project } from '../types';

export const initialProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with a modern UI, product management, and payment integration.',
    imageUrl: 'https://picsum.photos/seed/project1/600/400',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    repoUrl: 'https://github.com/example/ecommerce',
    liveUrl: '#',
  },
  {
    id: '2',
    name: 'Task Management App',
    description: 'A collaborative task management application to help teams organize and track their work effectively.',
    imageUrl: 'https://picsum.photos/seed/project2/600/400',
    tags: ['Vue.js', 'Firebase', 'Vuetify'],
    repoUrl: 'https://github.com/example/task-manager',
    liveUrl: '#',
  },
  {
    id: '3',
    name: 'Personal Portfolio V1',
    description: 'My previous personal portfolio website, built with vanilla HTML, CSS, and JavaScript.',
    imageUrl: 'https://picsum.photos/seed/project3/600/400',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: '#',
  },
];
    