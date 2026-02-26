import React, { useState, useEffect } from 'react';
import '../styles/ProjectPages.css';
import { fetchData } from '../utils/api';

function BloodDonationCampPage() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPageData = async () => {
      const data = await fetchData('/blood-donation-page?populate=*');
      if (data && data.data) {
        const baseUrl = data._baseUrl || process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
        const attributes = data.data.attributes || data.data;
        const imageObj = attributes.image?.data?.attributes || attributes.image;
        const imagePath = imageObj?.url;
        const imgUrl = imagePath
          ? (imagePath.startsWith('/') ? `${baseUrl}${imagePath}` : imagePath)
          : 'https://via.placeholder.com/400x300?text=Blood+Donation+Camp';
        setPageData({
          title: attributes.title || 'Blood Donation Camp',
          description: attributes.description || 'Saving lives through regular blood donation drives and awareness campaigns.',
          image: imgUrl,
          content: attributes.content || 'Our blood donation camps have helped save countless lives...'
        });
      }
      setLoading(false);
    };
    loadPageData();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="skeleton-grid">
          {[...Array(1)].map((_, i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-title" style={{ width: '60%', height: 28 }}></div>
              <div className="skeleton-desc" style={{ width: '90%', height: 16 }}></div>
              <div className="skeleton-desc" style={{ width: '70%', height: 16 }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!pageData) {
    return <div className="page-container"><p>Page data not available.</p></div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{pageData.title}</h1>
        <p>{pageData.description}</p>
      </div>
      <div className="page-content">
        <section className="project-section">
          <h2>Our Blood Donation Initiatives</h2>
          <div className="project-grid">
            <div className="project-card">
              <div className="project-image">
                <img src={pageData.image} alt="Blood Donation Camp" />
              </div>
              <div className="project-info">
                <h3>Community Health Impact</h3>
                <p>
                  {pageData.content}
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