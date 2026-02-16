import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProjectPages.css';
import { getProjectBySlug } from '../utils/api';

function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      const data = await getProjectBySlug(slug);
      if (data && data.data && data.data.length > 0) {
        setProject(data.data[0]);
      }
      setLoading(false);
    };
    loadProject();
  }, [slug]);

  if (loading) {
    return <div className="page-container"><p>Loading project...</p></div>;
  }

  if (!project) {
    return <div className="page-container"><p>Project not found.</p></div>;
  }

  const attributes = project.attributes;
  const images = attributes.images?.data?.map(img => 
    `${process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337'}${img.attributes.url}`
  ) || [];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{attributes.title}</h1>
        <p>{attributes.description}</p>
      </div>
      <div className="page-content">
        <section className="project-section">
          <div className="project-images">
            {images.map((img, index) => (
              <img key={index} src={img} alt={`${attributes.title} ${index + 1}`} />
            ))}
          </div>
          <div className="project-content" dangerouslySetInnerHTML={{ __html: attributes.content }} />
          {attributes.youtubeLinks && (
            <div className="youtube-links">
              <h3>YouTube Videos</h3>
              {attributes.youtubeLinks.split(',').map((link, index) => (
                <div key={index} className="youtube-link">
                  <a href={link.trim()} target="_blank" rel="noopener noreferrer">Watch Video {index + 1}</a>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ProjectPage;