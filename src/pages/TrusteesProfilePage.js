import React from 'react';
import '../styles/TrusteesProfile.css';

function TrusteesProfilePage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Trustees Profile</h1>
        <p>Learn about our dedicated trustees who guide our mission and vision.</p>
      </div>
      <div className="page-content">
        <section className="trustees-section">
          <h2>Our Trustees</h2>
          <div className="trustees-grid">
            {/* Trustee profiles will be added here */}
            <div className="trustee-card">
              <div className="trustee-image">
                <img src="/assets/images/trustee-placeholder.jpg" alt="Trustee" />
              </div>
              <div className="trustee-info">
                <h3>Trustee Name</h3>
                <p className="trustee-position">Position</p>
                <p className="trustee-description">
                  Brief description about the trustee's background and contributions to the foundation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TrusteesProfilePage;