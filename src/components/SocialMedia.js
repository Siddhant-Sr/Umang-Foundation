import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../styles/SocialMedia.css';

function SocialMedia() {
  return (
    <section className="social" id="social">
      <div className="social-container">
        <h2>Social Media</h2>
        <p className="social-intro">Follow us to stay updated with our latest programs and stories.</p>

        <div className="social-links-grid">
          <a href="https://www.facebook.com/umangfoundationmumbai" className="social-link" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" /> Facebook
          </a>
          <a href="https://twitter.com/UmangFoundation" className="social-link" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" /> Twitter
          </a>
          <a href="https://instagram.com/stories/umangfoundation/" className="social-link" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" /> Instagram
          </a>
          <a href="https://www.linkedin.com/company/1003569" className="social-link" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="social-icon" /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

export default SocialMedia;
