import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import CorporatePartners from '../components/CorporatePartners';

function Home() {
  return (
    <div>
      <Hero />
      <About />
      <CorporatePartners />
    </div>
  );
}

export default Home;