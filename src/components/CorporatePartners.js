import React, { useState, useEffect } from 'react';
import '../styles/Partners.css';
import { getPartners } from '../utils/api';

function CorporatePartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPartners = async () => {
      const data = await getPartners();
      const baseUrl = data?._baseUrl || process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
      if (data && data.data) {
        const partnerList = data.data.map((partner) => {
          const attrs = partner?.attributes || partner;
          const logoObj = attrs?.logo?.data?.attributes || attrs?.logo;
          const logoPath = logoObj?.url;
          const name = attrs?.name || 'Unknown Partner';
          const logo = logoPath
            ? (logoPath.startsWith('/') ? `${baseUrl}${logoPath}` : logoPath)
            : 'https://via.placeholder.com/180x80?text=Partner';
          return { name, logo };
        });
        // Duplicate for seamless loop
        setPartners([...partnerList, ...partnerList]);
      } else {
        setPartners([]);
      }
      setLoading(false);
    };
    loadPartners();
  }, []);

  if (loading) {
    return <div>Loading partners...</div>;
  }

  return (
    <section className="partners" id="partners">
      <div className="partners-container">
        <h2>Corporate Partners</h2>
        <p className="partners-intro">We thank our corporate partners for their generous support.</p>

        <div className="partners-slider">
          <div className="partners-track">
            {partners.map((p, i) => (
              <div className="partner-card" key={i}>
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
