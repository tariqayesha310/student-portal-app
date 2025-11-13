import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <span>Student Portal</span>
          </div>
          <div className="footer-links">
            <a href="https://github.com/tariqayesha310/student-portal-app" target="_blank" rel="noopener noreferrer">
              <Github size={18} />
              GitHub
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Made with <Heart size={14} color="#e11d48" /> for students everywhere</p>
          <p>&copy; {new Date().getFullYear()} Student Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
