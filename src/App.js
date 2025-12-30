import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import TrusteesProfilePage from './pages/TrusteesProfilePage';
import GoverningBoardMemberPage from './pages/GoverningBoardMemberPage';
import ProjectsPage from './pages/ProjectsPage';
import SchoolRenovationPage from './pages/SchoolRenovationPage';
import BloodDonationCampPage from './pages/BloodDonationCampPage';
import InternshipPage from './pages/InternshipPage';
import AssociatedSchoolsPage from './pages/AssociatedSchoolsPage';
import StoryOfChangePage from './pages/StoryOfChangePage';
import BeTheChangePage from './pages/BeTheChangePage';
import PaymentGatewayPage from './pages/PaymentGatewayPage';
import MediaGalleryPage from './pages/MediaGalleryPage';
import YouTubeLinkPage from './pages/YouTubeLinkPage';
import PhotoGalleryPage from './pages/PhotoGalleryPage';
import YearWiseGalleryPage from './pages/YearWiseGalleryPage';
import CorporatePartnersPage from './pages/CorporatePartnersPage';
import CorporateLogosPage from './pages/CorporateLogosPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import SocialMediaPage from './pages/SocialMediaPage';

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
          <Route path="/school-renovation" element={<SchoolRenovationPage />} />
          <Route path="/blood-donation-camp" element={<BloodDonationCampPage />} />
          <Route path="/village-activities" element={<ProjectsPage />} />
          <Route path="/inspire-a-kid-program" element={<ProjectsPage />} />
          <Route path="/promote-education" element={<ProjectsPage />} />
          <Route path="/smart-classroom" element={<ProjectsPage />} />
          <Route path="/gurukul-program" element={<ProjectsPage />} />
          <Route path="/meri-umang" element={<ProjectsPage />} />
          <Route path="/swatch-jal" element={<ProjectsPage />} />
          <Route path="/umang-care" element={<ProjectsPage />} />
          <Route path="/creative-hands" element={<ProjectsPage />} />
          <Route path="/internship" element={<InternshipPage />} />
          <Route path="/associated-schools" element={<AssociatedSchoolsPage />} />
          <Route path="/associated-colleges" element={<InternshipPage />} />
          <Route path="/story-of-change" element={<StoryOfChangePage />} />
          <Route path="/impact-of-social-initiatives" element={<StoryOfChangePage />} />
          <Route path="/be-the-change" element={<BeTheChangePage />} />
          <Route path="/payment-gateway" element={<PaymentGatewayPage />} />
          <Route path="/membership" element={<BeTheChangePage />} />
          <Route path="/csr-partnership" element={<BeTheChangePage />} />
          <Route path="/birthday-celebrations" element={<BeTheChangePage />} />
          <Route path="/media-gallery" element={<MediaGalleryPage />} />
          <Route path="/youtube-link" element={<YouTubeLinkPage />} />
          <Route path="/online-links" element={<MediaGalleryPage />} />
          <Route path="/newspaper-clippings" element={<MediaGalleryPage />} />
          <Route path="/photo-gallery" element={<PhotoGalleryPage />} />
          <Route path="/year-wise-gallery" element={<YearWiseGalleryPage />} />
          <Route path="/activity-wise-gallery" element={<PhotoGalleryPage />} />
          <Route path="/corporate-partners" element={<CorporatePartnersPage />} />
          <Route path="/corporate-logos" element={<CorporateLogosPage />} />
          <Route path="/corporate-names" element={<CorporatePartnersPage />} />
          <Route path="/schools-list" element={<CorporatePartnersPage />} />
          <Route path="/contact-us" element={<GetInvolvedPage />} />
          <Route path="/social-media" element={<SocialMediaPage />} />
          <Route path="/facebook" element={<SocialMediaPage />} />
          <Route path="/instagram" element={<SocialMediaPage />} />
          <Route path="/linkedin" element={<SocialMediaPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
