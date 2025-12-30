import React, { useState } from 'react';
import '../styles/MediaGallery.css';

// Sample media data - in real implementation, this would come from an API or database
const MEDIA_CATEGORIES = {
  'newspaper-clippings': {
    title: 'Newspaper Clippings',
    items: [
      { id: 1, src: '../assets/images/school-children-classroom.jpg', alt: 'School children in classroom', date: '2024-01-15' },
      { id: 2, src: '../assets/images/school-children-group.jpg', alt: 'Group of school children', date: '2024-01-10' },
      { id: 3, src: '../assets/images/download.webp', alt: 'Educational program coverage', date: '2024-01-05' },
      { id: 4, src: '../assets/images/download-1.webp', alt: 'Community outreach event', date: '2023-12-20' },
      { id: 5, src: '../assets/images/OIP-2.webp', alt: 'School inauguration ceremony', date: '2023-12-15' },
      { id: 6, src: '../assets/images/img-1.webp', alt: 'Children receiving educational materials', date: '2023-12-10' },
      // Add more items as needed
    ]
  },
  'online-links': {
    title: 'Online Media Coverage',
    items: [
      { id: 7, src: '../assets/images/school-children-classroom.jpg', alt: 'Digital media coverage', date: '2024-01-12' },
      { id: 8, src: '../assets/images/school-children-group.jpg', alt: 'Online article feature', date: '2024-01-08' },
      // Add more items as needed
    ]
  },
  'youtube-links': {
    title: 'YouTube Videos',
    items: [
      { id: 9, src: '../assets/images/download.webp', alt: 'Educational program video', date: '2024-01-14' },
      { id: 10, src: '../assets/images/download-1.webp', alt: 'Community impact story', date: '2024-01-06' },
      // Add more items as needed
    ]
  }
};

function MediaGallery() {
  const [activeCategory, setActiveCategory] = useState('newspaper-clippings');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const currentCategoryData = MEDIA_CATEGORIES[activeCategory];
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
          {Object.entries(MEDIA_CATEGORIES).map(([key, category]) => (
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
