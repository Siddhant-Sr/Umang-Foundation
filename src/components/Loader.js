import React from 'react';
import './Loader.css';

const Loader = ({ text = 'Loading...' }) => (
  <div className="loader-overlay">
    <div className="loader-spinner">
      <div className="spinner"></div>
      <span className="loader-text">{text}</span>
    </div>
  </div>
);

export default Loader;
