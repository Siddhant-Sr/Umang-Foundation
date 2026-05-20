import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProjectPages.css';
import '../styles/Skeleton.css';
import { getStoryOfChanges } from '../utils/api';

const toSlug = (value = '') =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 60);

function renderStoryContent(contentBlocks) {
  if (!Array.isArray(contentBlocks)) return null;

  return contentBlocks.map((block, idx) => {
    if (block.type === 'paragraph') {
      return (
        <p key={idx} className="justified-text">
          {(block.children || []).map((child, childIndex) => {
            if (child.bold) return <strong key={childIndex}>{child.text}</strong>;
            if (child.italic) return <em key={childIndex}>{child.text}</em>;
            return <React.Fragment key={childIndex}>{child.text}</React.Fragment>;
          })}
        </p>
      );
    }

    return null;
  });
}

function StoryDetailPage() {
  const { storySlug } = useParams();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      const data = await getStoryOfChanges();
      setStories(Array.isArray(data?.data) ? data.data : []);
      setLoading(false);
    };

    loadStories();
  }, []);

  const story = useMemo(() => {
    return stories.find((item) => {
      const attrs = item.attributes || item;
      const generatedSlug = attrs.slug || toSlug(attrs.title || '') || String(item.id);

      return (
        generatedSlug === storySlug ||
        String(item.id) === storySlug ||
        attrs.documentId === storySlug
      );
    });
  }, [stories, storySlug]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="skeleton-grid">
          {[...Array(1)].map((_, i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-title" style={{ width: '60%', height: 28 }}></div>
              <div className="skeleton-desc" style={{ width: '90%', height: 16 }}></div>
              <div className="skeleton-desc" style={{ width: '70%', height: 16 }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="page-container">
        <p>Story not found.</p>
      </div>
    );
  }

  const attrs = story.attributes || story;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{attrs.title}</h1>
        <p>{attrs.description}</p>
      </div>
      <div className="page-content">
        <section className="project-section">
          <div className="project-content">{renderStoryContent(attrs.contents || attrs.content)}</div>
        </section>
      </div>
    </div>
  );
}

export default StoryDetailPage;
