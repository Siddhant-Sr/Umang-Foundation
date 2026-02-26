import React, { useState, useEffect } from 'react';
import '../styles/TrusteesProfile.css';
import { getTrustees } from '../utils/api';
import { FALLBACK_API_URL } from '../config/api';

function TrusteesProfilePage() {
  const [trustees, setTrustees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrustees = async () => {
      const data = await getTrustees();
      if (data && data.data) {
        const baseUrl = data._baseUrl || FALLBACK_API_URL;
        
        const trusteeList = data.data.map(trustee => {
          const attrs = trustee?.attributes || trustee;
          const name = attrs?.name || 'Unknown Trustee';
          const position = attrs?.position || '';
          
          let imageUrl = '/assets/images/trustee-placeholder.jpg';
          if (attrs?.image) {
            if (attrs.image.url) {
              imageUrl = `${baseUrl}${attrs.image.url}`;
            } else if (attrs.image.data?.attributes?.url) {
              imageUrl = `${baseUrl}${attrs.image.data.attributes.url}`;
            }
          }
          
          let description = '';
          let descriptionParagraphs = [];
          if (attrs?.description) {
            if (Array.isArray(attrs.description)) {
              descriptionParagraphs = attrs.description
                .map(block => block?.children?.map(child => child.text).join('') || '')
                .filter(text => text.trim() !== '');
              description = descriptionParagraphs.join(' ');
            } else if (typeof attrs.description === 'string') {
              description = attrs.description;
              descriptionParagraphs = [attrs.description];
            }
          }
          
          const order = attrs?.order || 999;
          const email = attrs?.email || '';
          const phone = attrs?.phone || '';
          const linkedin = attrs?.linkedin || '';

          return {
            id: trustee?.id || trustee?.documentId,
            name,
            position,
            image: imageUrl,
            description,
            descriptionParagraphs,
            order,
            email,
            phone,
            linkedin
          };
        });
        
        trusteeList.sort((a, b) => a.order - b.order);
        setTrustees(trusteeList);
      } else {
        setTrustees([]);
      }
      setLoading(false);
    };
    loadTrustees();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1>Trustees Profile</h1>
          <p>Learn about our dedicated trustees who guide our mission and vision.</p>
        </div>
        <div className="page-content">
          <div className="loading-message">Loading trustees...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Trustees Profile</h1>
        <p>Learn about our dedicated trustees who guide our mission and vision.</p>
      </div>
      <div className="page-content">
        <section className="trustees-section">
          <h2>Our Trustees</h2>
          {trustees.length > 0 ? (
            <div className="trustees-grid">
              {trustees.map((trustee) => (
                <div className="trustee-card" key={trustee.id}>
                  <div className="trustee-image">
                    <img src={trustee.image} alt={trustee.name} />
                  </div>
                  <div className="trustee-info">
                    <h3>{trustee.name}</h3>
                    {trustee.position && (
                      <p className="trustee-position">{trustee.position}</p>
                    )}
                    {trustee.description && trustee.descriptionParagraphs && trustee.descriptionParagraphs.length > 0 && (
                      <div className="trustee-description">
                        {trustee.descriptionParagraphs.map((para, idx) => (
                          <p key={idx}>{para}</p>
                        ))}
                      </div>
                    )}
                    {(trustee.email || trustee.phone || trustee.linkedin) && (
                      <div className="trustee-contact">
                        {trustee.email && (
                          <a href={`mailto:${trustee.email}`} className="trustee-contact-link">
                            {trustee.email}
                          </a>
                        )}
                        {trustee.linkedin && (
                          <a 
                            href={trustee.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="trustee-linkedin"
                          >
                            LinkedIn
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-trustees">No trustees found.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default TrusteesProfilePage;