import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import CorporatePartners from '../components/CorporatePartners';
import '../styles/Skeleton.css';


function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '2rem' }}>
        <div className="skeleton-grid">
          {[...Array(1)].map((_, i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-title" style={{ width: '40%', height: 32 }}></div>
              <div className="skeleton-desc" style={{ width: '80%', height: 18 }}></div>
              <div className="skeleton-desc" style={{ width: '60%', height: 18 }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Hero />
      <About />
      <CorporatePartners />
    </div>
  );
}

export default Home;