import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Projects.css';
import '../styles/Skeleton.css';
import useIntersection from '../hooks/useIntersection';
import { getStoryOfChanges } from '../utils/api';

const toSlug = (value = '') =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 60);

function StoryOfChange() {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 });
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getStoryOfChanges();
        if (data && Array.isArray(data.data)) {
          setStories(data.data);
        } else {
          setError('No stories found.');
        }
      } catch (err) {
        setError('Failed to load stories.');
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, []);

  if (loading) {
    return (
      <section className="story" id="story-of-change">
        <div className="projects-container">
          <h2>Stories of Change</h2>
          <p className="projects-intro">Real stories from beneficiaries whose lives were transformed by Umang Foundation.</p>
          <div className="skeleton-grid">
            {[...Array(3)].map((_, i) => (
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
      <section className="story" id="story-of-change">
        <div className="projects-container">
          <h2>Stories of Change</h2>
          <p className="projects-intro">Real stories from beneficiaries whose lives were transformed by Umang Foundation.</p>
          <p className="projects-error-detail">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`story ${isVisible ? 'animate' : ''}`} id="story-of-change" ref={ref}>
      <div className="projects-container">
        <h2>Stories of Change</h2>
        <p className="projects-intro">Real stories from beneficiaries whose lives were transformed by Umang Foundation.</p>

        <div className="projects-grid">
          {stories.map((story) => {
            const attrs = story.attributes || story;
            const slug = attrs.slug || toSlug(attrs.title || '') || String(story.id);

            return (
              <Link
                to={`/impact-of-social-initiatives/${slug}`}
                key={story.id}
                className="project-card project-card-link"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h3>{attrs.title || 'Untitled Story'}</h3>
                <p>{attrs.description || 'No description available.'}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StoryOfChange;
