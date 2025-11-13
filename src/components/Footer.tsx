import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Student Portal</h3>
            <p>Your comprehensive study companion for organizing notes and managing schedules.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Dashboard</a></li>
              <li><a href="/notes">Notes</a></li>
              <li><a href="/upload">Upload</a></li>
              <li><a href="/timetable">Timetable</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="mailto:support@studentportal.com">Contact Us</a></li>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Student Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
