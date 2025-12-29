import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import InternshipPage from './pages/InternshipPage';
import StoryOfChangePage from './pages/StoryOfChangePage';
import BeTheChangePage from './pages/BeTheChangePage';
import MediaGalleryPage from './pages/MediaGalleryPage';
import PhotoGalleryPage from './pages/PhotoGalleryPage';
import ImpactPage from './pages/ImpactPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import SocialMediaPage from './pages/SocialMediaPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/internship" element={<InternshipPage />} />
          <Route path="/story-of-change" element={<StoryOfChangePage />} />
          <Route path="/be-the-change" element={<BeTheChangePage />} />
          <Route path="/media-gallery" element={<MediaGalleryPage />} />
          <Route path="/photo-gallery" element={<PhotoGalleryPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/contact-us" element={<GetInvolvedPage />} />
          <Route path="/social-media" element={<SocialMediaPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
