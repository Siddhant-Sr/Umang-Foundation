import React from 'react';
import '../styles/Impact.css';
import useIntersection from '../hooks/useIntersection';

function Impact() {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 });

  return (
    <section className={`impact ${isVisible ? 'animate' : ''}`} id="impact" ref={ref}>
      <div className="impact-container">
        <h2>Our Impact</h2>
        <p className="impact-intro">Real stories of change and transformation</p>
        
        <div className="impact-stories">
          <div className="story-card">
            <div className="story-image-placeholder">📖</div>
            <h3>Education Transformation</h3>
            <p>
              Over 10,000 students have benefited from our scholarship programs, 
              with 95% successfully completing their higher education.
            </p>
          </div>

          <div className="story-card">
            <div className="story-image-placeholder">🏥</div>
            <h3>Health & Wellness</h3>
            <p>
              We've conducted 200+ medical camps providing healthcare to 30,000+ 
              individuals in remote areas.
            </p>
          </div>

          <div className="story-card">
            <div className="story-image-placeholder">💼</div>
            <h3>Skill Development</h3>
            <p>
              5,000+ youth trained in vocational skills with 80% job placement rate, 
              creating sustainable livelihoods.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Impact;
