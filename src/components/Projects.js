import React from 'react';
import '../styles/Projects.css';
import useIntersection from '../hooks/useIntersection';

function Projects() {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 });

  return (
    <section className={`projects ${isVisible ? 'animate' : ''}`} id="projects" ref={ref}>
      <div className="projects-container">
        <h2>Our Projects</h2>
        <p className="projects-intro">A selection of ongoing and completed projects that empower children and communities.</p>

        <div className="projects-grid">
          <div className="project-card">
            <h3>School Support Program</h3>
            <p>Providing school supplies, uniforms and learning support to children in need.</p>
          </div>
          <div className="project-card">
            <h3>Health Camps</h3>
            <p>Regular medical camps and awareness drives in rural areas.</p>
          </div>
          <div className="project-card">
            <h3>Skill Development</h3>
            <p>Training youth in vocational skills for sustainable livelihoods.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
