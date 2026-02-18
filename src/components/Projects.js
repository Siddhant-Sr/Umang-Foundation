
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Projects.css';
import '../styles/Skeleton.css';
import useIntersection from '../hooks/useIntersection';
import { getProjects } from '../utils/api';


function Projects() {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // For future: pagination state
  // const [page, setPage] = useState(1);
  // const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProjects();
        if (data && data.data) {
          setProjects(data.data);
          // For future: setPageCount(data.meta?.pagination?.pageCount || 1);
        } else {
          setError('No projects found.');
        }
      } catch (err) {
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="projects" id="projects">
        <div className="projects-container">
          <h2>Our Projects</h2>
          <p className="projects-intro">A selection of ongoing and completed projects that empower children and communities.</p>
          <div className="skeleton-grid">
            {[...Array(6)].map((_, i) => (
              <div className="skeleton-card" key={i}>
                <div className="skeleton-title"></div>
                <div className="skeleton-desc"></div>
                <div className="skeleton-desc" style={{ width: '70%' }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="projects" id="projects">
        <div className="projects-error">
          <p>Sorry, we couldn't load the projects at this time.</p>
          <p className="projects-error-detail">{error}</p>
        </div>
      </section>
    );
  }

  if (!projects.length) {
    return (
      <section className="projects" id="projects">
        <div>No projects available at the moment.</div>
      </section>
    );
  }

  return (
    <section className={`projects ${isVisible ? 'animate' : ''}`} id="projects" ref={ref}>
      <div className="projects-container">
        <h2>Our Projects</h2>
        <p className="projects-intro">A selection of ongoing and completed projects that empower children and communities.</p>

        <div className="projects-grid">
          {projects.map(project => {
            // Strapi v4: data may be flat or under attributes
            const attrs = project.attributes || project;
            // Generate slug from title if missing
            let slug = attrs.slug;
            if (!slug && attrs.title) {
              slug = attrs.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
                .substring(0, 60);
            }
            // Fallback to id if no slug or title
            const projectLink = slug ? `/projects/${slug}` : `/projects/${project.id}`;
            return (
              <Link
                to={projectLink}
                key={project.id}
                className="project-card project-card-link"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h3>{attrs.title || 'Untitled Project'}</h3>
                <p>{attrs.description || 'No description available.'}</p>
                {/* Optionally render more fields, e.g. status, location, etc. */}
              </Link>
            );
          })}
        </div>
        {/* Future: Pagination controls can go here */}
      </div>
    </section>
  );
}

export default Projects;
