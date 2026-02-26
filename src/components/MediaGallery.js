import React, { useState, useEffect } from 'react';
import '../styles/MediaGallery.css';
import '../styles/SkeletonGallery.css';
import { fetchData } from '../utils/api';

function MediaGallery() {
  const [mediaCategories, setMediaCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalImage, setModalImage] = useState(null);
  const itemsPerPage = 12;

  useEffect(() => {
    const loadMedia = async () => {
      const data = await fetchData('/videos?populate=*');
      const baseUrl = data?._baseUrl || process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
      const toAbsoluteUrl = (url) => {
        if (!url) return '';
        return url.startsWith('/') ? `${baseUrl}${url}` : url;
      };
      let grouped = { Newspaper: { title: 'Newspaper', items: [] }, Youtube: { title: 'YouTube', items: [] } };
      if (data && data.data && data.data.length > 0) {
        data.data.forEach(rawItem => {
          const item = rawItem?.attributes || rawItem;
          if (item.type === 'newspaper') {
            // Newspaper: use thumbnail if available
            const thumbnail = item.thumbnail?.data?.attributes || item.thumbnail;
            let imgUrl = '';
            if (thumbnail?.formats) {
              if (thumbnail.formats.small?.url) {
                imgUrl = toAbsoluteUrl(thumbnail.formats.small.url);
              } else if (thumbnail.formats.thumbnail?.url) {
                imgUrl = toAbsoluteUrl(thumbnail.formats.thumbnail.url);
              } else if (thumbnail.url) {
                imgUrl = toAbsoluteUrl(thumbnail.url);
              }
            } else if (thumbnail?.url) {
              imgUrl = toAbsoluteUrl(thumbnail.url);
            } else {
              imgUrl = 'https://via.placeholder.com/400x300?text=No+Image';
            }
            grouped.Newspaper.items.push({
              id: item.id,
              src: imgUrl,
              alt: item.title || 'Newspaper',
              date: item.uploadeddate || '',
              title: item.title || '',
            });
          } else if (item.type === 'youtube') {
            // YouTube: get thumbnail from url
            let youtubeId = '';
            const match = item.url && item.url.match(/[?&]v=([^&#]+)/);
            if (match) youtubeId = match[1];
            const imgUrl = youtubeId
              ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
              : 'https://via.placeholder.com/400x300?text=YouTube+Video';
            grouped.Youtube.items.push({
              id: item.id,
              src: imgUrl,
              alt: item.title || 'YouTube Video',
              date: item.uploadeddate || '',
              title: item.title || '',
              url: item.url
            });
          }
        });
      }
      setMediaCategories(grouped);
      setActiveCategory('Newspaper');
      setLoading(false);
    };
    loadMedia();
  }, []);

  if (loading) {
    return (
      <div className="gallery-container">
        <div className="skeleton-gallery-grid">
          {[...Array(6)].map((_, i) => (
            <div className="skeleton-gallery-card" key={i}>
              <div className="skeleton-img"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-desc"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!activeCategory || !mediaCategories[activeCategory]) {
    return <div className="gallery-container"><p>No media available.</p></div>;
  }

  const currentCategoryData = mediaCategories[activeCategory];
  const totalItems = currentCategoryData.items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = currentCategoryData.items.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  return (
    <section className="media-gallery" id="media-gallery">
      <div className="gallery-container">
        <h2>Media Gallery</h2>
        <p className="gallery-intro">Comprehensive collection of media coverage and digital content showcasing our impact.</p>

        {/* Category Tabs */}
        <div className="category-tabs">
          {Object.entries(mediaCategories).map(([key, category]) => (
            <button
              key={key}
              className={`category-tab ${activeCategory === key ? 'active' : ''}`}
              onClick={() => handleCategoryChange(key)}
            >
              {category.title} ({category.items.length})
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="gallery-grid">
          {currentItems.map((item) => (
            activeCategory === 'Youtube' ? (
              <a
                className="gallery-item"
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
                <div className="item-overlay">
                  <p className="item-date">{item.date ? new Date(item.date).toLocaleDateString() : ''}</p>
                  <p className="item-description">{item.title}</p>
                </div>
              </a>
            ) : (
              <div
                className="gallery-item"
                key={item.id}
                style={{ cursor: 'pointer' }}
                onClick={() => setModalImage(item.src)}
                tabIndex={0}
                role="button"
                aria-label="Enlarge newspaper image"
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
                <div className="item-overlay">
                  <p className="item-date">{item.date ? new Date(item.date).toLocaleDateString() : ''}</p>
                  <p className="item-description">{item.title}</p>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Modal for enlarged image */}
        {modalImage && (
          <div
            className="modal-overlay"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999
            }}
            onClick={() => setModalImage(null)}
          >
            <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setModalImage(null)}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  fontSize: 22,
                  cursor: 'pointer',
                  zIndex: 2
                }}
                aria-label="Close enlarged image"
              >
                ×
              </button>
              <img
                src={modalImage}
                alt="Enlarged newspaper"
                style={{
                  maxWidth: '90vw',
                  maxHeight: '85vh',
                  borderRadius: 8,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                }}
              />
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="gallery-stats">
          <p>Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items in {currentCategoryData.title}</p>
        </div>
      </div>
    </section>
  );
}

export default MediaGallery;
