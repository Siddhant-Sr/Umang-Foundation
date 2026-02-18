import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import '../styles/ProjectPages.css';
import { getProjectBySlug, getProjects } from '../utils/api';

// Helper to render Strapi rich text (array of blocks) to HTML
function renderStrapiContent(content) {
  if (!Array.isArray(content)) return null;
  return content.map((block, idx) => {
    if (block.type === 'paragraph') {
      // Paragraph: join all children text
      const text = block.children.map((c, i) => {
        if (c.bold) return <strong key={i}>{c.text}</strong>;
        if (c.italic) return <em key={i}>{c.text}</em>;
        return c.text;
      });
      // Add <br/> after each paragraph for spacing
      return <p key={idx} className="justified-text">{text}<br/></p>;
    }
    // Add more block types as needed (heading, list, etc.)
    return null;
  });
}

function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      let data = await getProjectBySlug(slug);
      if (data && data.data && data.data.length > 0) {
        setProject(data.data[0]);
      } else {
        // Fallback: try to find by id or generated slug
        const all = await getProjects();
        if (all && all.data) {
          const found = all.data.find(p => {
            const attrs = p.attributes || p;
            // Try id match
            if (String(p.id) === slug) return true;
            // Try generated slug from title
            if (attrs.title) {
              const generatedSlug = attrs.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
                .substring(0, 60);
              if (generatedSlug === slug) return true;
            }
            return false;
          });
          if (found) setProject(found);
        }
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

  const attributes = project.attributes || project;
  // Defensive: Only map images if images exists and is an array
  const images = Array.isArray(attributes.images?.data)
    ? attributes.images.data.map(img =>
        `${process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337'}${img.attributes.url}`
      )
    : [];

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
          <div className="project-content">
            {renderStrapiContent(attributes.content)}
          </div>
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