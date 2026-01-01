import React, { useState } from 'react';
import '../styles/MediaGallery.css';

// Sample photo data organized by categories - in real implementation, this would come from an API or database
const PHOTO_CATEGORIES = {
  'projects': {
    title: 'Projects',
    description: 'Photos from our various educational and community development projects',
    subcategories: {
      'education': {
        title: 'Education Programs',
        items: [
          { id: 1, src: '../assets/images/school-children-classroom.jpg', alt: 'Children in classroom learning', location: 'Mumbai School', date: '2024-01-15' },
          { id: 2, src: '../assets/images/school-children-group.jpg', alt: 'Group study session', location: 'Delhi Center', date: '2024-01-10' },
          { id: 3, src: '../assets/images/download.webp', alt: 'Digital learning program', location: 'Pune Academy', date: '2024-01-05' },
        ]
      },
      'health': {
        title: 'Health & Nutrition',
        items: [
          { id: 4, src: '../assets/images/download-1.webp', alt: 'Health checkup camp', location: 'Rural Health Center', date: '2023-12-20' },
          { id: 5, src: '../assets/images/OIP-2.webp', alt: 'Nutrition program distribution', location: 'Community Hall', date: '2023-12-15' },
        ]
      }
    }
  },
  'schools': {
    title: 'Associated Schools',
    description: 'Partner schools and educational institutions we work with',
    subcategories: {
      'primary': {
        title: 'Primary Schools',
        items: [
          { id: 6, src: '../assets/images/img-1.webp', alt: 'Primary school classroom', location: 'St. Mary\'s Primary School', date: '2024-01-12' },
          { id: 7, src: '../assets/images/school-children-classroom.jpg', alt: 'Children at primary school', location: 'Government Primary School', date: '2024-01-08' },
        ]
      },
      'secondary': {
        title: 'Secondary Schools',
        items: [
          { id: 8, src: '../assets/images/school-children-group.jpg', alt: 'Secondary school students', location: 'City Secondary School', date: '2024-01-06' },
        ]
      }
    }
  },
  'events': {
    title: 'Events & Celebrations',
    description: 'Special events, celebrations, and community gatherings',
    subcategories: {
      'celebrations': {
        title: 'Festivals & Celebrations',
        items: [
          { id: 9, src: '../assets/images/download.webp', alt: 'Independence Day celebration', location: 'Community Ground', date: '2024-01-14' },
          { id: 10, src: '../assets/images/download-1.webp', alt: 'Children\'s Day event', location: 'School Auditorium', date: '2023-11-14' },
        ]
      },
      'workshops': {
        title: 'Workshops & Training',
        items: [
          { id: 11, src: '../assets/images/OIP-2.webp', alt: 'Teacher training workshop', location: 'Training Center', date: '2024-01-20' },
        ]
      }
    }
  }
};

function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState('projects');
  const [activeSubcategory, setActiveSubcategory] = useState('education');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const currentCategoryData = PHOTO_CATEGORIES[activeCategory];
  const currentSubcategoryData = currentCategoryData.subcategories[activeSubcategory];
  const totalItems = currentSubcategoryData.items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = currentSubcategoryData.items.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveSubcategory(Object.keys(PHOTO_CATEGORIES[category].subcategories)[0]);
    setCurrentPage(1);
  };

  const handleSubcategoryChange = (subcategory) => {
    setActiveSubcategory(subcategory);
    setCurrentPage(1);
  };

  return (
    <section className="photo-gallery" id="photo-gallery">
      <div className="gallery-container">
        <h2>Photo Gallery</h2>
        <p className="gallery-intro">Comprehensive collection of photos from our projects, schools, events, and community activities.</p>

        {/* Main Category Tabs */}
        <div className="category-tabs">
          {Object.entries(PHOTO_CATEGORIES).map(([key, category]) => (
            <button
              key={key}
              className={`category-tab ${activeCategory === key ? 'active' : ''}`}
              onClick={() => handleCategoryChange(key)}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Category Description */}
        <p className="category-description">{currentCategoryData.description}</p>

        {/* Subcategory Tabs */}
        <div className="subcategory-tabs">
          {Object.entries(currentCategoryData.subcategories).map(([key, subcategory]) => (
            <button
              key={key}
              className={`subcategory-tab ${activeSubcategory === key ? 'active' : ''}`}
              onClick={() => handleSubcategoryChange(key)}
            >
              {subcategory.title} ({subcategory.items.length})
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="gallery-grid">
          {currentItems.map((item) => (
            <div className="gallery-item" key={item.id}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <div className="item-overlay">
                <p className="item-location">{item.location}</p>
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
          <p>Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} photos in {currentSubcategoryData.title}</p>
        </div>
      </div>
    </section>
  );
}

export default PhotoGallery;
