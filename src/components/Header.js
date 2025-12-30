import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/images/Umang-Foundation-Logo.png';

function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const handleMouseEnter = (menu) => {
    setDropdownVisible(menu);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(null);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="Umang Foundation Logo" className="logo-image" />
        </div>
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li 
              className="dropdown"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/about">
                About Us
                <span className="dropdown-arrow">▼</span>
              </Link>
              {dropdownVisible === 'about' && (
                <ul className="dropdown-menu">
                  <li><Link to="/trustees-profile">Trustees Profile</Link></li>
                  <li><Link to="/governing-board-member">Governing Board Member</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/internship">Internship</Link></li>
            <li><Link to="/story-of-change">Story of Change</Link></li>
            <li><Link to="/be-the-change">Be the Change</Link></li>
            <li><Link to="/media-gallery">Media Gallery</Link></li>
            <li><Link to="/photo-gallery">Photo Gallery</Link></li>
            <li><Link to="/corporate-partners">Corporate Partners</Link></li>
            <li><Link to="/social-media">Social Media</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
