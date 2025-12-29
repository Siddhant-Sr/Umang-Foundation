import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/images/Umang-Foundation-Logo.png';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="Umang Foundation Logo" className="logo-image" />
        </div>
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/internship">Internship</Link></li>
            <li><Link to="/story-of-change">Story of Change</Link></li>
            <li><Link to="/be-the-change">Be the Change</Link></li>
            <li><Link to="/media-gallery">Media Gallery</Link></li>
            <li><Link to="/photo-gallery">Photo Gallery</Link></li>
            <li><Link to="/impact">Impact</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/social-media">Social Media</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
