import React, { useState, useEffect } from 'react';
import '../styles/MediaGallery.css';
import { fetchData } from '../utils/api';

function PhotoGallery() {
  const [photoCategories, setPhotoCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [activeSubcategory, setActiveSubcategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const loadPhotos = async () => {
      const data = await fetchData('/photos?populate=*');
      let grouped = {};
      if (data && data.data && data.data.length > 0) {
        // Group photos by category and subcategory
        data.data.forEach(photo => {
          const cat = photo.attributes.category;
          const subcat = photo.attributes.subcategory;
          const imgUrl = photo.attributes.image?.data?.attributes?.url
            ? `${process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337'}${photo.attributes.image.data.attributes.url}`
            : 'https://via.placeholder.com/400x300?text=No+Image';

          if (!grouped[cat]) {
            grouped[cat] = {
              title: cat.charAt(0).toUpperCase() + cat.slice(1),
              description: `Photos from ${cat}`,
              subcategories: {}
            };
          }
          if (!grouped[cat].subcategories[subcat]) {
            grouped[cat].subcategories[subcat] = {
              title: subcat.charAt(0).toUpperCase() + subcat.slice(1),
              items: []
            };
          }
          grouped[cat].subcategories[subcat].items.push({
            id: photo.id,
            src: imgUrl,
            alt: photo.attributes.alt || 'Photo',
            location: photo.attributes.location || 'Unknown',
            date: photo.attributes.date || '2024-01-01'
          });
        });
      } else {
        // Fallback dummy data
        grouped = {
          "yearwise": {
            title: "Yearwise",
            description: "Photos from Yearwise Activities",
            subcategories: {
              "2025": {
                title: "2025",
                items: [
                  { id: 1, src: "https://via.placeholder.com/400x300?text=2025+Event+1", alt: "2025 Event 1", location: "Delhi", date: "2025-01-10" },
                  { id: 2, src: "https://via.placeholder.com/400x300?text=2025+Event+2", alt: "2025 Event 2", location: "Mumbai", date: "2025-02-15" }
                ]
              },
              "2024": {
                title: "2024",
                items: [
                  { id: 3, src: "https://via.placeholder.com/400x300?text=2024+Event+1", alt: "2024 Event 1", location: "Kolkata", date: "2024-03-20" }
                ]
              }
            }
          },
          "activitywise": {
            title: "Activitywise",
            description: "Photos from Activitywise Events",
            subcategories: {
              "Blood Donation": {
                title: "Blood Donation",
                items: [
                  { id: 4, src: "https://via.placeholder.com/400x300?text=Blood+Donation", alt: "Blood Donation Camp", location: "Chennai", date: "2025-04-05" }
                ]
              }
            }
          }
        };
      }
      setPhotoCategories(grouped);
      if (Object.keys(grouped).length > 0) {
        const firstCat = Object.keys(grouped)[0];
        setActiveCategory(firstCat);
        if (grouped[firstCat].subcategories && Object.keys(grouped[firstCat].subcategories).length > 0) {
          setActiveSubcategory(Object.keys(grouped[firstCat].subcategories)[0]);
        }
      }
      setLoading(false);
    };
    loadPhotos();
  }, []);

  if (loading) {
    return <div className="gallery-container"><p>Loading photos...</p></div>;
  }

  if (!activeCategory || !photoCategories[activeCategory]) {
    return <div className="gallery-container"><p>No photos available.</p></div>;
  }

  const currentCategoryData = photoCategories[activeCategory];
  const currentSubcategoryData = currentCategoryData.subcategories[activeSubcategory];
  const totalItems = currentSubcategoryData ? currentSubcategoryData.items.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = currentSubcategoryData ? currentSubcategoryData.items.slice(startIndex, endIndex) : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveSubcategory(Object.keys(photoCategories[category].subcategories)[0]);
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
          {Object.entries(photoCategories).map(([key, category]) => (
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
          {currentCategoryData.subcategories && Object.entries(currentCategoryData.subcategories).map(([key, subcategory]) => (
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
