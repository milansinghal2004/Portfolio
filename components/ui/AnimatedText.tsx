
import React from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  return (
    <div className={`inline-block ${className}`}>
      <span
        className="block overflow-hidden whitespace-nowrap border-r-4 border-r-secondary animate-text-type"
        style={{ animationDelay: '0.5s' }} // Add a slight delay for better effect
      >
        {text}
      </span>
    </div>
  );
};

export default AnimatedText;
    