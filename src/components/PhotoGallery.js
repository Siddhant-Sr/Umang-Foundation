import React, { useState, useEffect } from 'react';
import '../styles/MediaGallery.css';
import '../styles/SkeletonGallery.css';
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
      const baseUrl = data?._baseUrl || process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
      const toAbsoluteUrl = (url) => {
        if (!url) return '';
        return url.startsWith('/') ? `${baseUrl}${url}` : url;
      };
      // let grouped = {};
      if (data && data.data && data.data.length > 0) {
        // Group by year
        const yearwise = {};
        // Group by activity/category
        const activitywise = {};
        data.data.forEach(rawPhoto => {
          const photo = rawPhoto?.attributes || rawPhoto;
          // Yearwise
          const year = photo.date ? String(new Date(photo.date).getFullYear()) : 'Unknown';
          const image = photo.image?.data?.attributes || photo.image;
          let imgUrl = '';
          if (image?.formats) {
            if (image.formats.thumbnail?.url) {
              imgUrl = toAbsoluteUrl(image.formats.thumbnail.url);
            } else if (image.formats.small?.url) {
              imgUrl = toAbsoluteUrl(image.formats.small.url);
            } else if (image.url) {
              imgUrl = toAbsoluteUrl(image.url);
            }
          } else if (image?.url) {
            imgUrl = toAbsoluteUrl(image.url);
          } else {
            imgUrl = 'https://via.placeholder.com/400x300?text=No+Image';
          }
          if (!yearwise[year]) {
            yearwise[year] = {
              title: year,
              items: []
            };
          }
          yearwise[year].items.push({
            id: photo.id,
            src: imgUrl,
            alt: photo.alt || photo.title || 'Photo',
            location: photo.location || 'Unknown',
            date: photo.date || '',
            title: photo.title || '',
          });

          // Activitywise
          const cat = photo.category || 'Uncategorized';
          const subcat = photo.subcategory || 'General';
          if (!activitywise[cat]) {
            activitywise[cat] = {
              title: cat,
              subcategories: {}
            };
          }
          if (!activitywise[cat].subcategories[subcat]) {
            activitywise[cat].subcategories[subcat] = {
              title: subcat,
              items: []
            };
          }
          activitywise[cat].subcategories[subcat].items.push({
            id: photo.id,
            src: imgUrl,
            alt: photo.alt || photo.title || 'Photo',
            location: photo.location || 'Unknown',
            date: photo.date || '',
            title: photo.title || '',
          });
        });
        // Compose the two main tabs
        const grouped = {
          Yearwise: {
            title: 'Yearwise',
            description: 'Photos grouped by year',
            subcategories: yearwise
          },
          Activitywise: {
            title: 'Activitywise',
            description: 'Photos grouped by activity',
            subcategories: activitywise
          }
        };
        setPhotoCategories(grouped);
        setActiveCategory('Yearwise');
        const yearKeys = Object.keys(yearwise);
        setActiveSubcategory(yearKeys.length > 0 ? yearKeys[0] : '');
      }
      setLoading(false);
    };
    loadPhotos();
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

  if (!activeCategory || !photoCategories[activeCategory]) {
    return <div className="gallery-container"><p>No photos available.</p></div>;
  }

  // For Yearwise, subcategories are years; for Activitywise, subcategories are activities, then subcategories
  const currentCategoryData = photoCategories[activeCategory];
  let subcategoryKeys = [];
  let subcategoryMap = {};
  if (activeCategory === 'Yearwise') {
    subcategoryKeys = Object.keys(currentCategoryData.subcategories).sort((a, b) => b.localeCompare(a)); // Descending year
    subcategoryMap = currentCategoryData.subcategories;
  } else if (activeCategory === 'Activitywise') {
    // Flatten activitywise: show all activities as subcategories, then when one is selected, show its sub-subcategories
    subcategoryKeys = Object.keys(currentCategoryData.subcategories);
    subcategoryMap = currentCategoryData.subcategories;
  }

  // For Activitywise, if a subcategory is selected, show its subcategories as tabs
  let currentSubcategoryData = null;
  let subSubcategoryKeys = [];
  let subSubcategoryMap = {};
  if (activeCategory === 'Activitywise' && activeSubcategory && subcategoryMap[activeSubcategory]) {
    subSubcategoryMap = subcategoryMap[activeSubcategory].subcategories;
    subSubcategoryKeys = subSubcategoryMap ? Object.keys(subSubcategoryMap) : [];
    // If a sub-subcategory is selected, show its items
    if (subSubcategoryKeys.length > 0) {
      // If activeSubSubcategory is not set, default to first
      if (!window._activeSubSubcategory || !subSubcategoryMap[window._activeSubSubcategory]) {
        window._activeSubSubcategory = subSubcategoryKeys[0];
      }
      currentSubcategoryData = subSubcategoryMap[window._activeSubSubcategory];
    }
  } else {
    currentSubcategoryData = subcategoryMap[activeSubcategory];
  }

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
    setCurrentPage(1);
    // Set default subcategory
    const keys = Object.keys(photoCategories[category].subcategories);
    setActiveSubcategory(keys.length > 0 ? keys[0] : '');
    // For Activitywise, reset sub-subcategory
    if (category === 'Activitywise') {
      window._activeSubSubcategory = null;
    }
  };

  const handleSubcategoryChange = (subcategory) => {
    setActiveSubcategory(subcategory);
    setCurrentPage(1);
    // For Activitywise, reset sub-subcategory
    if (activeCategory === 'Activitywise') {
      window._activeSubSubcategory = null;
    }
  };

  // For Activitywise, handle sub-subcategory
  const handleSubSubcategoryChange = (subsubcategory) => {
    window._activeSubSubcategory = subsubcategory;
    setCurrentPage(1);
  };

  return (
    <section className="photo-gallery" id="photo-gallery">
      <div className="gallery-container">
        <h2>Photo Gallery</h2>
        <p className="gallery-intro">Comprehensive collection of photos from our projects, schools, events, and community activities.</p>

        {/* Main Tabs: Yearwise / Activitywise */}
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
          {subcategoryKeys.map((key) => (
            <button
              key={key}
              className={`subcategory-tab ${activeSubcategory === key ? 'active' : ''}`}
              onClick={() => handleSubcategoryChange(key)}
            >
              {subcategoryMap[key].title} {subcategoryMap[key].items ? `(${subcategoryMap[key].items.length})` : ''}
            </button>
          ))}
        </div>

        {/* For Activitywise, show sub-subcategory tabs if present */}
        {activeCategory === 'Activitywise' && subSubcategoryKeys.length > 0 && (
          <div className="subcategory-tabs">
            {subSubcategoryKeys.map((key) => (
              <button
                key={key}
                className={`subcategory-tab ${window._activeSubSubcategory === key ? 'active' : ''}`}
                onClick={() => handleSubSubcategoryChange(key)}
              >
                {subSubcategoryMap[key].title} ({subSubcategoryMap[key].items.length})
              </button>
            ))}
          </div>
        )}

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
          <p>Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} photos in {currentSubcategoryData ? currentSubcategoryData.title : ''}</p>
        </div>
      </div>
    </section>
  );
}

export default PhotoGallery;
