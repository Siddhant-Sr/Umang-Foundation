import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';
import '../styles/SkeletonGallery.css';
import { getHeroImages } from '../utils/api';

function Hero() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHeroImages = async () => {
      const data = await getHeroImages();
      const baseUrl = data?._baseUrl || process.env.REACT_APP_STRAPI_URL || 'https://umang-backend-ty0e.onrender.com';
      if (data && Array.isArray(data.data)) {
        const imgUrls = data.data.map((img) => {
          const entity = img?.attributes || img;
          const imageObj = entity?.image?.data?.attributes || entity?.image;
          let imageUrl = imageObj?.url;
          if (imageUrl && imageUrl.startsWith('/')) {
            imageUrl = `${baseUrl}${imageUrl}`;
          }
          if (imageUrl) {
            return imageUrl;
          } else {
            return 'https://via.placeholder.com/800x400?text=Hero+Image';
          }
        });
        setImages(imgUrls);
      } else {
        // Fallback to placeholders
        setImages([
          'https://via.placeholder.com/800x400?text=Hero+Image+1',
          'https://via.placeholder.com/800x400?text=Hero+Image+2',
          'https://via.placeholder.com/800x400?text=Hero+Image+3',
          'https://via.placeholder.com/800x400?text=Hero+Image+4'
        ]);
      }
      setLoading(false);
    };
    loadHeroImages();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isPaused && images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds
      return () => clearInterval(interval);
    }
  }, [images.length, isPaused]);

  if (loading) {
    return (
      <section className="hero">
        <div className="skeleton-hero"></div>
      </section>
    );
  }

  return (
    <section className="hero" id="home">
      <div className="carousel" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
        <button className="carousel-arrow left" onClick={prevSlide}>&lt;</button>
        <button className="carousel-arrow right" onClick={nextSlide}>&gt;</button>
        <div className="carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
      <div className="hero-content">
        <h2>Welcome to Umang Foundation</h2>
        <p>Making a difference in the community through education, health, and social welfare</p>
        <div className="hero-buttons">
          <button className="btn btn-primary">Donate Now</button>
          <button className="btn btn-secondary">Learn More</button>
        </div>
      </div>
      <div className="hero-overlay"></div>
    </section>
  );
}

export default Hero;
