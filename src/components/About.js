import React from 'react';
import '../styles/About.css';
import useIntersection from '../hooks/useIntersection';

function About() {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 });

  return (
    <section className={`about ${isVisible ? 'animate' : ''}`} id="about" ref={ref}>
      <div className="about-container">
        <div className="about-content">
          <h2>About Umang Foundation</h2>
          <p>
            Umang Foundation is a dedicated non-profit organization committed to uplifting 
            underprivileged communities through quality education, healthcare, and sustainable 
            social development programs.
          </p>
          <p>
            Since our inception, we have touched the lives of thousands of individuals, 
            providing them with opportunities to build a brighter future. Our mission is to 
            create a society where every individual has equal access to education and 
            healthcare services.
          </p>
          <div className="about-stats">
            <div className="stat">
              <h3>50,000+</h3>
              <p>Lives Impacted</p>
            </div>
            <div className="stat">
              <h3>15+</h3>
              <p>Active Programs</p>
            </div>
            <div className="stat">
              <h3>100%</h3>
              <p>Transparency</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
