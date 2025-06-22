import { Project } from '../types';

export const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Telegram N8n Bot',
    description: 'A no-code, AI-powered Telegram assistant using n8n that integrates CRM, email, scheduling, and real-time search—functioning like a smart executive assistant with memory and contextual awareness.',
    imageUrl: 'n8n.png',
    tags: ['N8n', 'Automation', 'API Management'],
    repoUrl: 'https://github.com/milansinghal2004/N8n-Models',
    liveUrl: '#',
  },
  {
    id: '2',
    name: 'Sign Language Recognition',
    description: 'A real-time, AI-powered sign language recognition system using YOLOv8, SVC, and MediaPipe to translate gestures into text, bridging communication between deaf and hearing individuals.',
    imageUrl: 'GestureBridge.jpg',
    tags: ['YOLO v8', 'MediaPipe', 'Machine Learning', 'Deep Learning'],
    repoUrl: 'https://github.com/milansinghal2004/Gesture-Bridge',
    liveUrl: '#',
  },
  {
    id: '3',
    name: 'Stock Anomaly Detector',
    description: 'Developed a Tkinter-based stock forecasting app using YFinance and Prophet, featuring interactive plots with pan/zoom and achieving <5% MAPE and <2% false positives via Z-Score anomaly detection.',
    imageUrl: 'StockAnomaly.webp',
    tags: ['Python', 'YFinance', 'Prophet', 'Anomaly Detection'],
    repoUrl: 'https://github.com/milansinghal2004/Stock-Price-Anomaly-Detection-using-Z-Score-',
    liveUrl: '#',
  },
];
