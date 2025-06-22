
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-border-light dark:border-border-dark py-8 text-center">
      <p className="text-sm text-text-light/70 dark:text-text-dark/70">
        &copy; {currentYear} Your Name. All rights reserved.
      </p>
      <p className="text-xs text-text-light/50 dark:text-text-dark/50 mt-1">
        Built with React and Tailwind CSS.
      </p>
    </footer>
  );
};

export default Footer;