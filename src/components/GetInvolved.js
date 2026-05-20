
import React, { useState } from 'react';
import '../styles/GetInvolved.css';
import useIntersection from '../hooks/useIntersection';
import { API_BASE_URL } from '../config/api';

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


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact-uses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit form.');
      }
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`get-involved ${isVisible ? 'animate' : ''}`} id="get-involved" ref={ref}>
      <div className="get-involved-container">
        <h2>Get Involved</h2>
        <p className="intro-text">Join us in making a difference</p>
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
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {success && <div className="form-success" style={{ color: 'green', marginTop: 10 }}>Thank you for reaching out! We will get back to you soon.</div>}
            {error && <div className="form-error" style={{ color: 'red', marginTop: 10 }}>{error}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default GetInvolved;
