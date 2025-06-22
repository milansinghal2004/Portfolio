export interface Internship {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
  companyUrl?: string;
  timeline?: {
    title: string;
    period: string;
  }[];
}

export const internships: Internship[] = [
  {
    id: '1',
    company: 'PwC Launchpad',
    position: 'Data Science Intern',
    duration: 'February 2025 - Present',
    location: 'Remote',
    description: 'A foundational course in Data Science that blends Statistical Analysis, Computer Science, and domain expertise. It covers key topics like Data Warehousing, ETL processes, BI design, Machine Learning, and Python programming, with hands-on exercises to apply concepts to real-world data problems.',
    achievements: [
      'Learned about the basics of data science and how to apply it to real-world problems',
      'Mastered database management concepts and SQL query optimization',
      'Developed proficiency in Python programming for data analysis',
      'Gained hands-on experience with Oracle database systems and ETL processes',
      'Applied IT fundamentals to solve complex data warehousing challenges'
    ],
    technologies: ['IT Fundamentals', 'Oracle', 'Data Science', 'Database Management', 'SQL', 'Python'],
    logo: 'PwC.jpg',
    companyUrl: 'https://www.pwc.com'
  },
  {
    id: '2',
    company: 'Quality AI',
    position: 'Machine Learning Intern',
    duration: 'January 2025 - March 2025',
    location: 'Remote',
    description: 'Focused on developing and implementing machine learning algorithms and models for quality assurance and predictive analytics in various domains.',
    achievements: [
      'Developed machine learning models for quality prediction and anomaly detection',
      'Implemented data preprocessing pipelines for large-scale datasets',
      'Created automated quality assessment tools using ML algorithms',
      'Collaborated with data scientists to optimize model performance',
      'Contributed to research on AI-driven quality improvement methodologies'
    ],
    technologies: ['Machine Learning', 'Python', 'TensorFlow', 'Scikit-learn', 'Data Preprocessing', 'Quality Assurance', 'Predictive Analytics'],
    logo: 'quality-ai-logo.png',
    companyUrl: 'https://www.qualityai.com'
  },
  {
    id: '3',
    company: 'Cosmofleet',
    position: 'Robotics Intern',
    duration: 'June 2024 - July 2024',
    location: 'Remote',
    description: 'Conducted research on robotic arm systems and space exploration technologies, with a focus on Mars colonization and autonomous robotics.',
    achievements: [
      'Researched and analyzed robotic arm technologies for space applications',
      'Wrote a comprehensive research paper on Mars colonization strategies',
      'Studied autonomous navigation systems for planetary exploration',
      'Investigated robotic systems for extraterrestrial resource utilization',
      'Contributed to the development of space robotics simulation models'
    ],
    technologies: ['Robotics', 'Space Technology', 'Research & Development', 'Autonomous Systems', 'Mars Colonization', 'Simulation', 'Technical Writing'],
    logo: 'cosmofleet-logo.png',
    companyUrl: 'https://www.cosmofleet.com'
  },
  {
    id: '4',
    company: 'UPES ACM & ACM-W Student Chapters',
    position: 'Board of Executives',
    duration: 'May 2025 - Present',
    location: 'Dehradun, India',
    description: 'Leading design and technology initiatives for the university\'s ACM chapters, fostering innovation and collaboration among students.',
    achievements: [
      'Led design and content teams for major university events',
      'Organized technical workshops and hackathons',
      'Mentored junior students in design and development',
      'Increased chapter membership by 40% through strategic initiatives',
      'Best CSR Performer at UPES ACM & ACM-W Student Chapters in 2023',
      'Created compelling visual designs using Adobe Photoshop and Illustrator',
      'Developed user-friendly interfaces and prototypes with Figma'
    ],
    technologies: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Event Management', 'Leadership', 'Mentoring', 'CSR', 'Team Management'],
    logo: 'acm and acm-w white.PNG',
    companyUrl: 'https://www.upesacm.org',
    timeline: [
      {
        title: 'Design Lead',
        period: '2023 - 24'
      },
      {
        title: 'Joint Secretary',
        period: '2024 - 25'
      },
      {
        title: 'Board of Executives',
        period: '2025 - Present'
      }
    ]
  }
]; 