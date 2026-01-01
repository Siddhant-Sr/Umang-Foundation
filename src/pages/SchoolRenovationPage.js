import React from 'react';
import '../styles/ProjectPages.css';

function SchoolRenovationPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>School Renovation</h1>
        <p>Transforming educational spaces to create better learning environments for students.</p>
      </div>
      <div className="page-content">
        <section className="project-section">
          <h2>Our School Renovation Initiatives</h2>
          <div className="project-grid">
            <div className="project-card">
              <div className="project-image">
                <img src="/assets/images/school-renovation-1.jpg" alt="School Renovation" />
              </div>
              <div className="project-info">
                <h3>Recent Renovations</h3>
                <p>
                  We have successfully renovated multiple schools, providing modern facilities,
                  clean classrooms, and safe learning environments for thousands of students.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SchoolRenovationPage;