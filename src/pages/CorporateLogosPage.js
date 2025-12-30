import React from 'react';
import '../styles/ProjectPages.css';

function CorporateLogosPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Corporate Partners</h1>
        <p>Meet our valued corporate partners who support our mission and initiatives.</p>
      </div>
      <div className="page-content">
        <section className="partners-section">
          <h2>Our Corporate Partners</h2>
          <div className="logos-grid">
            <div className="logo-card">
              <img src="/assets/images/partner-logo-1.png" alt="Corporate Partner 1" />
              <h4>Partner Company Name</h4>
            </div>
            <div className="logo-card">
              <img src="/assets/images/partner-logo-2.png" alt="Corporate Partner 2" />
              <h4>Partner Company Name</h4>
            </div>
            <div className="logo-card">
              <img src="/assets/images/partner-logo-3.png" alt="Corporate Partner 3" />
              <h4>Partner Company Name</h4>
            </div>
          </div>
          <div className="partnership-info">
            <p>
              We are grateful to our corporate partners for their generous support and commitment
              to social responsibility. Their contributions help us expand our reach and impact.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CorporateLogosPage;