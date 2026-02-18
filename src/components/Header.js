// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Header.css';
// import { getLogo, getProjects } from '../utils/api';

// function Header() {
//   const [logo, setLogo] = useState('../assets/images/Umang-Foundation-Logo.png');
//   const [loading, setLoading] = useState(true);
//   const [dropdownVisible, setDropdownVisible] = useState(null);
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const loadLogo = async () => {
//       const data = await getLogo();
//       if (data && data.data) {
//         const logoUrl = data.data.attributes.logo?.data?.attributes?.url
//           ? `${process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337'}${data.data.attributes.logo.data.attributes.url}`
//           : 'https://via.placeholder.com/150x50?text=Umang+Foundation+Logo';
//         setLogo(logoUrl);
//       }
//     };
//     const loadProjects = async () => {
//       const data = await getProjects();
//       if (data && data.data) {
//         setProjects(data.data);
//       }
//     };
//     loadLogo();
//     loadProjects();
//     setLoading(false);
//   }, []);

//   const handleMouseEnter = (menu) => {
//     setDropdownVisible(menu);
//   };

//   const handleMouseLeave = () => {
//     setDropdownVisible(null);
//   };

//   if (loading) {
//     return <header className="header"><div>Loading header...</div></header>;
//   }

//   return (
//     <header className="header">
//       <div className="header-container">
//         <div className="logo">
//           <Link to="/">
//             <img src={logo} alt="Umang Foundation Logo" className="logo-image" />
//           </Link>
//         </div>
//         <nav className="navbar">
//           <ul className="nav-links">
//             <li><Link to="/">Home</Link></li>
//             <li 
//               className="dropdown"
//               onMouseEnter={() => handleMouseEnter('about')}
//               onMouseLeave={handleMouseLeave}
//             >
//               <Link to="/about">
//                 About Us
//                 <span className="dropdown-arrow">▼</span>
//               </Link>
//               {dropdownVisible === 'about' && (
//                 <ul className="dropdown-menu">
//                   <li><Link to="/trustees-profile">Trustees Profile</Link></li>
//                   <li><Link to="/governing-board-member">Governing Board Member</Link></li>
//                 </ul>
//               )}
//             </li>
//             <li>
//               <Link to="/projects">
//                 Projects
//               </Link>
//             </li>
//             <li>
//               <Link to="/resource-manager">
//                 Resource Manager
//               </Link>
//             </li>
//             <li 
//               className="dropdown"
//               onMouseEnter={() => handleMouseEnter('internship')}
//               onMouseLeave={handleMouseLeave}
//             >
//               <Link to="/internship">
//                 Internship
//                 <span className="dropdown-arrow">▼</span>
//               </Link>
//               {dropdownVisible === 'internship' && (
//                 <ul className="dropdown-menu">
//                   <li><Link to="/associated-schools">Associated Schools</Link></li>
//                   <li><Link to="/associated-colleges">Associated Colleges</Link></li>
//                 </ul>
//               )}
//             </li>
//             <li 
//               className="dropdown"
//               onMouseEnter={() => handleMouseEnter('story-of-change')}
//               onMouseLeave={handleMouseLeave}
//             >
//               <Link to="/story-of-change">
//                 Story of Change
//                 <span className="dropdown-arrow">▼</span>
//               </Link>
//               {dropdownVisible === 'story-of-change' && (
//                 <ul className="dropdown-menu">
//                   <li><Link to="/impact-of-social-initiatives">Impact of Various Social Initiatives</Link></li>
//                 </ul>
//               )}
//             </li>
//             <li 
//               className="dropdown"
//               onMouseEnter={() => handleMouseEnter('be-the-change')}
//               onMouseLeave={handleMouseLeave}
//             >
//               <Link to="/be-the-change">
//                 Be the Change
//                 <span className="dropdown-arrow">▼</span>
//               </Link>
//               {dropdownVisible === 'be-the-change' && (
//                 <ul className="dropdown-menu">
//                   <li><Link to="/payment-gateway">Payment Gateway Link</Link></li>
//                   <li><Link to="/membership">Membership</Link></li>
//                   <li><Link to="/csr-partnership">CSR Partnership</Link></li>
//                   <li><Link to="/birthday-celebrations">Celebration of Birthday and Special Occasions</Link></li>
//                 </ul>
//               )}
//             </li>
//             <li 
//               className="dropdown"
//               onMouseEnter={() => handleMouseEnter('media-gallery')}
//               onMouseLeave={handleMouseLeave}
//             >
//               <Link to="/media-gallery">
//                 Media Gallery
//                 <span className="dropdown-arrow">▼</span>
//               </Link>
//               {dropdownVisible === 'media-gallery' && (
//                 <ul className="dropdown-menu">
//                   <li><Link to="/youtube-link">YouTube Link</Link></li>
//                   <li><Link to="/online-links">Online Links</Link></li>
//                   <li><Link to="/newspaper-clippings">Newspaper Clippings</Link></li>
//                 </ul>
//               )}
//             </li>
//             <li 
//               className="dropdown"
//               onMouseEnter={() => handleMouseEnter('photo-gallery')}
//               onMouseLeave={handleMouseLeave}
//             >
//               <Link to="/photo-gallery">
//                 Photo Gallery
//                 <span className="dropdown-arrow">▼</span>
//               </Link>
//               {dropdownVisible === 'photo-gallery' && (
//                 <ul className="dropdown-menu">
//                   <li><Link to="/year-wise-gallery">Year-wise Photo Gallery</Link></li>
//                   <li><Link to="/activity-wise-gallery">Activity-wise Photo Gallery</Link></li>
//                 </ul>
//               )}
//             </li>
//             <li>
//               <Link to="/corporate-partners">
//                 Corporate Partners
//               </Link>
//             </li>
//             <li><Link to="/social-media">Social Media</Link></li>
//             <li><Link to="/contact-us">Contact Us</Link></li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// }

// export default Header;
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { getLogo } from "../utils/api";

function Header() {
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navRef = useRef();

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const data = await getLogo();
        const logoUrl =
          data?.data?.attributes?.logo?.data?.attributes?.url
            ? `${process.env.REACT_APP_STRAPI_URL || "http://localhost:1337"}${data.data.attributes.logo.data.attributes.url}`
            : "/assets/images/Umang-Foundation-Logo.png";

        setLogo(logoUrl);
      } catch (err) {
        console.error("Logo load failed", err);
        setLogo("/assets/images/Umang-Foundation-Logo.png");
      } finally {
        setLoading(false);
      }
    };

    loadLogo();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    {
      name: "About Us",
      path: "/about",
      dropdown: [
        { name: "Trustees Profile", path: "/trustees-profile" },
        { name: "Governing Board Member", path: "/governing-board-member" },
      ],
    },
    { name: "Projects", path: "/projects" },
    { name: "Resource Manager", path: "/resource-manager" },
    {
      name: "Internship",
      path: "/internship",
      dropdown: [
        { name: "Associated Schools", path: "/associated-schools" },
        { name: "Associated Colleges", path: "/associated-colleges" },
      ],
    },
    {
      name: "Story of Change",
      path: "/story-of-change",
      dropdown: [
        {
          name: "Impact of Various Social Initiatives",
          path: "/impact-of-social-initiatives",
        },
      ],
    },
    {
      name: "Be the Change",
      path: "/be-the-change",
      dropdown: [
        { name: "Payment Gateway Link", path: "/payment-gateway" },
        { name: "Membership", path: "/membership" },
        { name: "CSR Partnership", path: "/csr-partnership" },
        {
          name: "Celebration of Birthday and Special Occasions",
          path: "/birthday-celebrations",
        },
      ],
    },
    {
      name: "Gallery",
      dropdown: [
        {
          name: "Photo Gallery",
          path: "/photo-gallery",
        },
        {
          name: "Media Gallery",
          path: "/media-gallery",
        },
      ],
    },
    { name: "Corporate Partners", path: "/corporate-partners" },
    { name: "Social Media", path: "/social-media" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  if (loading) {
    return <header className="header">Loading...</header>;
  }

  return (
    <header className="header" ref={navRef}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Umang Foundation Logo" />
          </Link>
        </div>

        <div
          className={`hamburger ${mobileOpen ? "open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`navbar ${mobileOpen ? "active" : ""}`}>
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="nav-item"
                onMouseEnter={() => window.innerWidth > 992 && setActiveDropdown(index)}
                onMouseLeave={() => window.innerWidth > 992 && setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <div
                      className="dropdown-toggle"
                      onClick={() =>
                        window.innerWidth <= 992 &&
                        setActiveDropdown(
                          activeDropdown === index ? null : index
                        )
                      }
                    >
                      {item.name}
                      <span
                        className={`arrow ${
                          activeDropdown === index ? "rotate" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </div>

                    <ul
                      className={`dropdown-menu ${
                        activeDropdown === index ? "show" : ""
                      }`}
                    >
                      {item.dropdown.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            onClick={() => {
                              setMobileOpen(false);
                              setActiveDropdown(null);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => {
                      setMobileOpen(false);
                      setActiveDropdown(null);
                    }}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
