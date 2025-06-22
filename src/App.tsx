import React from 'react';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import InternshipsSection from './components/sections/InternshipsSection';
import PublicationsSection from './components/sections/PublicationsSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import { useTheme } from './hooks/useTheme';
import { internships } from './data/internships';
import { publications } from './data/publications';

const App: React.FC = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-sans transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <InternshipsSection internships={internships} />
        <PublicationsSection publications={publications} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
