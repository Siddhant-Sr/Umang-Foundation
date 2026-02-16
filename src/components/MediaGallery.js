import React, { useState, useEffect } from 'react';
import '../styles/MediaGallery.css';
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
      if (data && data.data) {
        // Group media by category
        const grouped = {};
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
        setMediaCategories(grouped);
        if (Object.keys(grouped).length > 0) {
          setActiveCategory(Object.keys(grouped)[0]);
        }
      }
      setLoading(false);
    };
    loadMedia();
  }, []);

  if (loading) {
    return <div className="gallery-container"><p>Loading media...</p></div>;
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
