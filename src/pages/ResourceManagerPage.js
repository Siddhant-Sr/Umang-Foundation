import React from 'react';
import ResourceManager from '../components/ResourceManager';
import '../styles/ProjectPages.css';

function ResourceManagerPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Resource Manager</h1>
        <p>Access important organizational documents, reports, and compliance records.</p>
      </div>

      <div className="page-content">
        <section className="resource-manager-section">
          <ResourceManager />
        </section>
      </div>
    </div>
  );
}

export default ResourceManagerPage;
