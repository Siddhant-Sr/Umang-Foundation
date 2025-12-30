import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import InternshipPage from './pages/InternshipPage';
import StoryOfChangePage from './pages/StoryOfChangePage';
import BeTheChangePage from './pages/BeTheChangePage';
import MediaGalleryPage from './pages/MediaGalleryPage';
import PhotoGalleryPage from './pages/PhotoGalleryPage';
import CorporatePartnersPage from './pages/CorporatePartnersPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import SocialMediaPage from './pages/SocialMediaPage';
import TrusteesProfilePage from './pages/TrusteesProfilePage';
import GoverningBoardMemberPage from './pages/GoverningBoardMemberPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/trustees-profile" element={<TrusteesProfilePage />} />
          <Route path="/governing-board-member" element={<GoverningBoardMemberPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/internship" element={<InternshipPage />} />
          <Route path="/story-of-change" element={<StoryOfChangePage />} />
          <Route path="/be-the-change" element={<BeTheChangePage />} />
          <Route path="/media-gallery" element={<MediaGalleryPage />} />
          <Route path="/photo-gallery" element={<PhotoGalleryPage />} />
          <Route path="/corporate-partners" element={<CorporatePartnersPage />} />
          <Route path="/contact-us" element={<GetInvolvedPage />} />
          <Route path="/social-media" element={<SocialMediaPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
