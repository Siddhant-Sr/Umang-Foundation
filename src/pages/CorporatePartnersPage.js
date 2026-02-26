import React from 'react';
import CorporatePartners from '../components/CorporatePartners';
import '../styles/ProjectPages.css';

function CorporatePartnersPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Corporate Partners</h1>
        <p>Meet our valued corporate partners who support our mission and initiatives.</p>
      </div>
      <div className="page-content">
        <CorporatePartners mode="cards" />
      </div>
    </div>
  );
}

export default CorporatePartnersPage;