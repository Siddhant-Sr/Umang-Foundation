import React from 'react';
import '../styles/ProjectPages.css';

function AssociatedSchoolsPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Associated Schools</h1>
        <p>Partner schools offering internship opportunities for students and young professionals.</p>
      </div>
      <div className="page-content">
        <section className="internship-section">
          <h2>Our Partner Schools</h2>
          <div className="schools-grid">
            <div className="school-card">
              <div className="school-image">
                <img src="/assets/images/school-partner.jpg" alt="Partner School" />
              </div>
              <div className="school-info">
                <h3>Partner School Name</h3>
                <p className="school-location">Location: Mumbai, Maharashtra</p>
                <p className="school-description">
                  A leading educational institution providing excellent internship opportunities
                  in teaching, administration, and community development.
                </p>
                <div className="internship-opportunities">
                  <h4>Available Internships:</h4>
                  <ul>
                    <li>Teaching Assistant</li>
                    <li>Administrative Support</li>
                    <li>Community Outreach</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AssociatedSchoolsPage;