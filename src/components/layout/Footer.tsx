import React from 'react';
import { socialLinks } from '../../data/socialLinks';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-background-light via-gray-50 to-background-light dark:from-background-dark dark:via-slate-800 dark:to-background-dark border-t border-border-light dark:border-border-dark">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">
              Milan Singhal
            </h3>
            <p className="text-sm text-text-light/70 dark:text-text-dark/70 mb-4 leading-relaxed">
              Creative technologist and final-year Computer Science undergraduate, 
              passionate about design, intelligent systems, and user-focused engineering.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-text-light/50 dark:text-text-dark/50 transition-all duration-300 transform hover:scale-110 ${social.color} p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800`}
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 inline-block text-left">
              {[
                { href: '#about', label: 'About Me' },
                { href: '#skills', label: 'Skills' },
                { href: '#projects', label: 'Projects' },
                { href: '#internships', label: 'Experience' },
                { href: '#contact', label: 'Contact' }
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left md:pl-8">
            <h4 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">
              Get In Touch
            </h4>
            <div className="space-y-2 text-sm text-text-light/70 dark:text-text-dark/70">
              <p className="flex items-center justify-center md:justify-start">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                singhalmilan92@gmail.com
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Dehradun, India
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
                Available for opportunities
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
