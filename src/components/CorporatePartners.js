import React, { useState, useEffect } from 'react';
import '../styles/Partners.css';
import { getPartners } from '../utils/api';

function CorporatePartners({ mode = 'slider' }) {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPartners = async () => {
      const data = await getPartners();
      const baseUrl = data?._baseUrl || process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
      if (data && data.data) {
        const partnerList = data.data.map((partner, index) => {
          const attrs = partner?.attributes || partner;
          const logoObj = attrs?.logo?.data?.attributes || attrs?.logo;
          const logoPath =
            logoObj?.formats?.small?.url ||
            logoObj?.formats?.thumbnail?.url ||
            logoObj?.url;
          const name = attrs?.name || attrs?.organizationName || 'Unknown Partner';
          const descriptionParagraphs = Array.isArray(attrs?.description)
            ? attrs.description
                .map((block) => block?.children?.map((child) => child?.text || '').join('') || '')
                .filter((text) => text.trim() !== '')
            : (typeof attrs?.description === 'string' && attrs.description.trim() ? [attrs.description] : []);
          const logo = logoPath
            ? (logoPath.startsWith('/') ? `${baseUrl}${logoPath}` : logoPath)
            : 'https://via.placeholder.com/180x80?text=Partner';
          return {
            id: partner?.id || partner?.documentId || `${name}-${index}`,
            name,
            logo,
            descriptionParagraphs
          };
        });
        setPartners(mode === 'slider' ? [...partnerList, ...partnerList] : partnerList);
      } else {
        setPartners([]);
      }
      setLoading(false);
    };
    loadPartners();
  }, [mode]);

  if (loading) {
    return <div>Loading partners...</div>;
  }

  if (mode === 'cards') {
    return (
      <section className="corporate-partners-page-section">
        {partners.length > 0 ? (
          <div className="corporate-partners-stack">
            {partners.map((partner) => (
              <article className="corporate-partner-card" key={partner.id}>
                <div className="corporate-partner-logo-wrap">
                  <img src={partner.logo} alt={partner.name} className="corporate-partner-logo" />
                </div>
                <div className="corporate-partner-info">
                  <h3>{partner.name}</h3>
                  {partner.descriptionParagraphs.length > 0 ? (
                    <div className="corporate-partner-description">
                      {partner.descriptionParagraphs.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="corporate-partner-empty">No description available.</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="corporate-partner-empty">No partners found.</p>
        )}
      </section>
    );
  }

  return (
    <section className="partners" id="partners">
      <div className="partners-container">
        <h2>Corporate Partners</h2>
        <p className="partners-intro">We thank our corporate partners for their generous support.</p>

        <div className="partners-slider">
          <div className="partners-track animate">
            {partners.map((p, i) => (
              <div className="partner-card" key={`${p.id || p.name}-${i}`}>
                <img src={p.logo} alt={p.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CorporatePartners;
