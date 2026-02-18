import React, { useState, useEffect } from 'react';
import '../styles/MediaGallery.css';
import '../styles/SkeletonGallery.css';
import { fetchData } from '../utils/api';

function MediaGallery() {
  const [mediaCategories, setMediaCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const loadMedia = async () => {
      const data = await fetchData('/media?populate=*');
      let grouped = {};
      if (data && data.data && data.data.length > 0) {
        // Group media by category
        data.data.forEach(media => {
          const cat = media.attributes.category;
          const imgUrl = media.attributes.image?.data?.attributes?.url
            ? `${process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337'}${media.attributes.image.data.attributes.url}`
            : 'https://via.placeholder.com/400x300?text=No+Image';

          if (!grouped[cat]) {
            grouped[cat] = {
              title: cat.charAt(0).toUpperCase() + cat.slice(1),
              items: []
            };
          }
          grouped[cat].items.push({
            id: media.id,
            src: imgUrl,
            alt: media.attributes.alt || 'Media',
            date: media.attributes.date || '2024-01-01'
          });
        });
      } else {
        // Fallback dummy data
        grouped = {
          "newspapers": {
            title: "Newspapers",
            items: [
              { id: 1, src: "https://via.placeholder.com/400x300?text=Newspaper+1", alt: "Newspaper Clipping 1", date: "2025-01-10" },
              { id: 2, src: "https://via.placeholder.com/400x300?text=Newspaper+2", alt: "Newspaper Clipping 2", date: "2025-02-15" }
            ]
          },
          "online": {
            title: "Online",
            items: [
              { id: 3, src: "https://via.placeholder.com/400x300?text=Online+Media+1", alt: "Online Media 1", date: "2025-03-20" }
            ]
          },
          "youtube": {
            title: "YouTube",
            items: [
              { id: 4, src: "https://via.placeholder.com/400x300?text=YouTube+Video", alt: "YouTube Video", date: "2025-04-05" }
            ]
          }
        };
      }
      setMediaCategories(grouped);
      if (Object.keys(grouped).length > 0) {
        setActiveCategory(Object.keys(grouped)[0]);
      }
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
            <div className="gallery-item" key={item.id}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <div className="item-overlay">
                <p className="item-date">{new Date(item.date).toLocaleDateString()}</p>
                <p className="item-description">{item.alt}</p>
              </div>
            </div>
          ))}
        </div>

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
