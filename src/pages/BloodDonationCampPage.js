import React from 'react';
import '../styles/ProjectPages.css';

function BloodDonationCampPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Blood Donation Camp</h1>
        <p>Saving lives through regular blood donation drives and awareness campaigns.</p>
      </div>
      <div className="page-content">
        <section className="project-section">
          <h2>Our Blood Donation Initiatives</h2>
          <div className="project-grid">
            <div className="project-card">
              <div className="project-image">
                <img src="/assets/images/blood-donation.jpg" alt="Blood Donation Camp" />
              </div>
              <div className="project-info">
                <h3>Community Health Impact</h3>
                <p>
                  Our blood donation camps have helped save countless lives by ensuring
                  a steady supply of blood for hospitals and medical emergencies.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BloodDonationCampPage;