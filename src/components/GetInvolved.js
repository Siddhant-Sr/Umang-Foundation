import React, { useState } from 'react';
import '../styles/GetInvolved.css';
import useIntersection from '../hooks/useIntersection';

function GetInvolved() {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className={`get-involved ${isVisible ? 'animate' : ''}`} id="get-involved" ref={ref}>
      <div className="get-involved-container">
        <h2>Get Involved</h2>
        <p className="intro-text">Join us in making a difference</p>
        
        <div className="involvement-options">
          <div className="option-card">
            <h3>💝 Donate</h3>
            <p>Your donation directly helps us serve those in need</p>
            <button className="btn btn-primary">Contribute Now</button>
          </div>

          <div className="option-card">
            <h3>🤝 Volunteer</h3>
            <p>Share your time and skills with our community programs</p>
            <button className="btn btn-primary">Join Us</button>
          </div>

          <div className="option-card">
            <h3>📢 Spread Awareness</h3>
            <p>Help us reach more people and expand our impact</p>
            <button className="btn btn-primary">Share Story</button>
          </div>
        </div>

        <div className="contact-form-container">
          <h3>Contact Us</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default GetInvolved;
