import React from 'react';
import '../styles/Services.css';
import useIntersection from '../hooks/useIntersection';

function Services() {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 });

  const services = [
    {
      id: 1,
      icon: '📚',
      title: 'Quality Education',
      description: 'Providing scholarships and educational programs to underprivileged children'
    },
    {
      id: 2,
      icon: '🏥',
      title: 'Healthcare',
      description: 'Free medical camps and health awareness programs for rural communities'
    },
    {
      id: 3,
      icon: '👨‍👩‍👧‍👦',
      title: 'Community Development',
      description: 'Empowering communities through skill development and social welfare'
    },
    {
      id: 4,
      icon: '🌱',
      title: 'Environmental Care',
      description: 'Promoting sustainable practices and environmental conservation'
    }
  ];

  return (
    <section className={`services ${isVisible ? 'animate' : ''}`} id="services" ref={ref}>
      <div className="services-container">
        <h2>Our Services</h2>
        <p className="services-intro">Making a positive impact through our core programs</p>
        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.id}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
