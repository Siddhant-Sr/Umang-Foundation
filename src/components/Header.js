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
            <li 
              className="dropdown"
              onMouseEnter={() => handleMouseEnter('projects')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/projects">
                Projects
                <span className="dropdown-arrow">▼</span>
              </Link>
              {dropdownVisible === 'projects' && (
                <ul className="dropdown-menu">
                  <li><Link to="/school-renovation">School Renovation</Link></li>
                  <li><Link to="/blood-donation-camp">Blood Donation Camp</Link></li>
                  <li><Link to="/village-activities">Village Activities</Link></li>
                  <li><Link to="/inspire-a-kid-program">Inspire a Kid Program</Link></li>
                  <li><Link to="/promote-education">Promote Education</Link></li>
                  <li><Link to="/smart-classroom">Smart Classroom</Link></li>
                  <li><Link to="/gurukul-program">Gurukul Program</Link></li>
                  <li><Link to="/meri-umang">Meri Umang</Link></li>
                  <li><Link to="/swatch-jal">Swatch Jal</Link></li>
                  <li><Link to="/umang-care">Umang Care</Link></li>
                  <li><Link to="/creative-hands">Creative Hands</Link></li>
                </ul>
              )}
            </li>
            <li 
              className="dropdown"
              onMouseEnter={() => handleMouseEnter('internship')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/internship">
                Internship
                <span className="dropdown-arrow">▼</span>
              </Link>
              {dropdownVisible === 'internship' && (
                <ul className="dropdown-menu">
                  <li><Link to="/associated-schools">Associated Schools</Link></li>
                  <li><Link to="/associated-colleges">Associated Colleges</Link></li>
                </ul>
              )}
            </li>
            <li 
              className="dropdown"
              onMouseEnter={() => handleMouseEnter('story-of-change')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/story-of-change">
                Story of Change
                <span className="dropdown-arrow">▼</span>
              </Link>
              {dropdownVisible === 'story-of-change' && (
                <ul className="dropdown-menu">
                  <li><Link to="/impact-of-social-initiatives">Impact of Various Social Initiatives</Link></li>
                </ul>
              )}
            </li>
            <li 
              className="dropdown"
              onMouseEnter={() => handleMouseEnter('be-the-change')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/be-the-change">
                Be the Change
                <span className="dropdown-arrow">▼</span>
              </Link>
              {dropdownVisible === 'be-the-change' && (
                <ul className="dropdown-menu">
                  <li><Link to="/payment-gateway">Payment Gateway Link</Link></li>
                  <li><Link to="/membership">Membership</Link></li>
                  <li><Link to="/csr-partnership">CSR Partnership</Link></li>
                  <li><Link to="/birthday-celebrations">Celebration of Birthday and Special Occasions</Link></li>
                </ul>
              )}
            </li>
            <li 
              className="dropdown"
              onMouseEnter={() => handleMouseEnter('media-gallery')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/media-gallery">
                Media Gallery
                <span className="dropdown-arrow">▼</span>
              </Link>
              {dropdownVisible === 'media-gallery' && (
                <ul className="dropdown-menu">
                  <li><Link to="/youtube-link">YouTube Link</Link></li>
                  <li><Link to="/online-links">Online Links</Link></li>
                  <li><Link to="/newspaper-clippings">Newspaper Clippings</Link></li>
                </ul>
              )}
            </li>
            <li 
              className="dropdown"
              onMouseEnter={() => handleMouseEnter('photo-gallery')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/photo-gallery">
                Photo Gallery
                <span className="dropdown-arrow">▼</span>
              </Link>
              {dropdownVisible === 'photo-gallery' && (
                <ul className="dropdown-menu">
                  <li><Link to="/year-wise-gallery">Year-wise Photo Gallery</Link></li>
                  <li><Link to="/activity-wise-gallery">Activity-wise Photo Gallery</Link></li>
                </ul>
              )}
            </li>
            <li 
              className="dropdown"
              onMouseEnter={() => handleMouseEnter('corporate-partners')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/corporate-partners">
                Corporate Partners
                <span className="dropdown-arrow">▼</span>
              </Link>
              {dropdownVisible === 'corporate-partners' && (
                <ul className="dropdown-menu">
                  <li><Link to="/corporate-logos">Logo of Corporate Partners</Link></li>
                  <li><Link to="/corporate-names">Names of Corporate Partners</Link></li>
                  <li><Link to="/schools-list">List of Schools</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/social-media">Social Media</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
