import React from 'react';
import '../styles/ProjectPages.css';

function YearWiseGalleryPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Year-wise Photo Gallery</h1>
        <p>Journey through our work year by year, showcasing our growth and impact.</p>
      </div>
      <div className="page-content">
        <section className="gallery-section">
          <h2>Our Journey Through the Years</h2>
          <div className="year-gallery">
            <div className="year-card">
              <h3>2024</h3>
              <div className="year-photos">
                <img src="/assets/images/2024-1.jpg" alt="2024 Activities" />
                <img src="/assets/images/2024-2.jpg" alt="2024 Activities" />
                <img src="/assets/images/2024-3.jpg" alt="2024 Activities" />
              </div>
            </div>
            <div className="year-card">
              <h3>2023</h3>
              <div className="year-photos">
                <img src="/assets/images/2023-1.jpg" alt="2023 Activities" />
                <img src="/assets/images/2023-2.jpg" alt="2023 Activities" />
                <img src="/assets/images/2023-3.jpg" alt="2023 Activities" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default YearWiseGalleryPage;