import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';
import img1 from '../assets/images/school-children-classroom.jpg';
import img2 from '../assets/images/school-children-group.jpg';
import img3 from '../assets/images/download.webp';
import img4 from '../assets/images/download-1.webp';

function Hero() {
  const images = [img1, img2, img3, img4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds
      return () => clearInterval(interval);
    }
  }, [images.length, isPaused]);

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
