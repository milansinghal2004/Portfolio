export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  conference?: string;
  year: string;
  description: string;
  abstract: string;
  keywords: string[];
  doi?: string;
  url?: string;
  pdfUrl?: string;
  type: 'journal' | 'conference' | 'research' | 'paper';
  status: 'published' | 'submitted' | 'in-progress';
  impact?: string;
}

export const publications: Publication[] = [
  {
    id: '2',
    title: 'Recognising Words in American Sign Language: A YOLOv11 Based Approach',
    authors: ['Milan Singhal'],
    journal: 'International Journal of Computer Vision and Pattern Recognition',
    year: '2025',
    description: 'Advanced research on word-level American Sign Language recognition using YOLOv11 for improved communication accessibility.',
    abstract: 'This research presents a novel approach to word-level American Sign Language (ASL) recognition using the state-of-the-art YOLOv11 model. Unlike previous approaches that focus primarily on alphabet recognition, this work extends the scope to complete word recognition in ASL, enabling more natural and fluid communication. The system utilizes YOLOv11\'s enhanced object detection capabilities to identify and classify complex hand gestures, facial expressions, and body movements that constitute ASL words. Our methodology includes comprehensive dataset preparation, model training with extensive ASL word vocabulary, and real-time implementation for practical applications. The results demonstrate significant improvements in word recognition accuracy compared to traditional approaches, making substantial progress toward bridging the communication gap between deaf and hearing communities.',
    keywords: ['American Sign Language (ASL)', 'YOLOv11', 'Word Recognition', 'Computer Vision', 'Deep Learning', 'Gesture Recognition'],
    type: 'journal',
    status: 'published',
    impact: 'Under review for publication in top-tier computer vision journal',
    url: 'https://www.ijert.org/recognising-words-in-american-sign-language-a-yolov11-based-approach',
    pdfUrl: 'https://www.ijert.org/research/recognising-words-in-american-sign-language-a-yolov11-based-approach-IJERTV14IS050339.pdf'
  },
  {
    id: '3',
    title: 'Sign Language Recognition',
    authors: ['Milan Singhal'],
    journal: 'International Journal of Engineering Research & Technology (IJERT)',
    year: '2025',
    description: 'Research on real-time American Sign Language (ASL) recognition using YOLO models for bridging communication gaps between deaf and hearing communities.',
    abstract: 'The primary concern of this project is to take American Sign Language (ASL) data through live camera feed and convert those letters (alphabets) and information into plain text. Additionally, this research also focuses on creating a framework that could help converting the sign language in real time thus breaking the language barrier for the people in need. For the research, we have used You Only Look Once (YOLO) model, executing in real time extracting discriminating spatial-temporal data without any prior knowledge in the domain. To the best of our knowledge, this is a rare study using only YOLO model to demonstrate bidirectional sign language communication in real time in the American Sign Language (ASL).',
    keywords: ['Sign Language', 'You Only Look Once (YOLO)', 'American Sign Language (ASL)', 'Natural Language Processing', 'Machine Learning', 'Deep Learning'],
    type: 'journal',
    status: 'published',
    impact: 'Published in IJERT Volume 14, Issue 4',
    url: 'https://www.ijert.org/sign-language-recognition-2',
    pdfUrl: 'https://www.ijert.org/research/sign-language-recognition-IJERTV14IS040033.pdf'
  },
  {
    id: '1',
    title: 'Mars Colonization: A Comprehensive Analysis of Robotic Systems and Autonomous Navigation',
    authors: ['Milan Singhal'],
    // conference: 'International Conference on Space Robotics',
    year: '2024',
    description: 'A comprehensive research paper analyzing the potential for sustainable human habitation on Mars through metal extraction and resource utilization strategies.',
    abstract: 'The colonization of Mars and the extraction of metals will prove a powerful weapon for establishing a sustainable human presence on Mars, with selected attention to the lengthy period of habitation. The researchers are examining the Martian environment, its geological composition, atmospheric situations, and potential sources. This research is based on theoretical fashions and simulation records, which provide information on the capability for human agreement on Mars and using its sources to help extraterrestrial growth.',
    keywords: ['Mars Colonization', 'Metal Extraction', 'Sustainable Habitation', 'Geological Analysis', 'Resource Utilization', 'Extraterrestrial Development'],
    type: 'research',
    status: 'published',
    impact: 'Contributed to space colonization research community',
    url: 'https://www.researchgate.net/publication/382399185_MARS_COLONIZATION',
  },
]; 