// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We are committed to making the world a better place through donations and community efforts.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/info">Info</a></li>
            <li><a href="/donate">Donate</a></li>
            <li><a href="/edu">Education</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li><a href="mailto:hello@SWC.com.my">hello@SWC.com.my</a></li>
            <li><a href="tel:+1234567890">(123) 456-7890</a></li>
          </ul> 
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Group 12. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
