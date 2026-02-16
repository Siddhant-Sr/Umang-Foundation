import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Projects.css';
import useIntersection from '../hooks/useIntersection';
import { getProjects } from '../utils/api';

function Projects() {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await getProjects();
      if (data && data.data) {
        setProjects(data.data);
      }
      setLoading(false);
    };
    loadProjects();
  }, []);

  if (loading) {
    return <section className="projects" id="projects"><div>Loading projects...</div></section>;
  }

  return (
    <section className={`projects ${isVisible ? 'animate' : ''}`} id="projects" ref={ref}>
      <div className="projects-container">
        <h2>Our Projects</h2>
        <p className="projects-intro">A selection of ongoing and completed projects that empower children and communities.</p>

        <div className="projects-grid">
          {projects.map(project => (
            <div className="project-card" key={project.id}>
              <Link to={`/projects/${project.attributes.slug}`}>
                <h3>{project.attributes.title}</h3>
                <p>{project.attributes.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
