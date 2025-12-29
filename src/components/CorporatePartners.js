import React from 'react';
import '../styles/Partners.css';

const PARTNERS = [
  { name: 'Partner A', logo: 'https://via.placeholder.com/180x80?text=Partner+A' },
  { name: 'Partner B', logo: 'https://via.placeholder.com/180x80?text=Partner+B' },
  { name: 'Partner C', logo: 'https://via.placeholder.com/180x80?text=Partner+C' },
  { name: 'Partner D', logo: 'https://via.placeholder.com/180x80?text=Partner+D' }
];

// Duplicate for seamless loop
const allPartners = [...PARTNERS, ...PARTNERS];

function CorporatePartners() {
  return (
    <section className="partners" id="partners">
      <div className="partners-container">
        <h2>Corporate Partners</h2>
        <p className="partners-intro">We thank our corporate partners for their generous support.</p>

        <div className="partners-slider">
          <div className="partners-track">
            {allPartners.map((p, i) => (
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
