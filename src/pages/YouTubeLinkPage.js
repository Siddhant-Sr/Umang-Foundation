import React from 'react';
import '../styles/ProjectPages.css';

function YouTubeLinkPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>YouTube Channel</h1>
        <p>Watch our videos showcasing our work, stories, and impact in communities.</p>
      </div>
      <div className="page-content">
        <section className="youtube-section">
          <h2>Our YouTube Content</h2>
          <div className="video-grid">
            <div className="video-card">
              <div className="video-thumbnail">
                <img src="/assets/images/video-thumbnail.jpg" alt="Video Thumbnail" />
                <div className="play-button">▶</div>
              </div>
              <div className="video-info">
                <h3>Project Impact Stories</h3>
                <p>Real stories from communities we've helped transform</p>
                <span className="video-duration">5:32</span>
              </div>
            </div>
          </div>
          <div className="youtube-link">
            <a href="https://youtube.com/@umangfoundation" target="_blank" rel="noopener noreferrer" className="youtube-btn">
              Visit Our YouTube Channel
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default YouTubeLinkPage;