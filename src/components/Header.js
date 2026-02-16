import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { getLogo, getProjects } from '../utils/api';

function Header() {
  const [logo, setLogo] = useState('https://via.placeholder.com/150x50?text=Umang+Foundation+Logo');
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadLogo = async () => {
      const data = await getLogo();
      if (data && data.data) {
        const logoUrl = data.data.attributes.logo?.data?.attributes?.url
          ? `${process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337'}${data.data.attributes.logo.data.attributes.url}`
          : 'https://via.placeholder.com/150x50?text=Umang+Foundation+Logo';
        setLogo(logoUrl);
      }
    };
    const loadProjects = async () => {
      const data = await getProjects();
      if (data && data.data) {
        setProjects(data.data);
      }
    };
    loadLogo();
    loadProjects();
    setLoading(false);
  }, []);

  const handleMouseEnter = (menu) => {
    setDropdownVisible(menu);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(null);
  };

  if (loading) {
    return <header className="header"><div>Loading header...</div></header>;
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Umang Foundation Logo" className="logo-image" />
          </Link>
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
            <li>
              <Link to="/projects">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/resource-manager">
                Resource Manager
              </Link>
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
            <li>
              <Link to="/corporate-partners">
                Corporate Partners
              </Link>
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
