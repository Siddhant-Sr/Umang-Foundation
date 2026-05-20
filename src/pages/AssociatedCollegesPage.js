import React, { useEffect, useState } from 'react';
import '../styles/ProjectPages.css';
import { getPartnerSchoolsAndColleges } from '../utils/partnerSchoolsApi';

function AssociatedCollegesPage() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPartnerSchoolsAndColleges().then((res) => {
      if (res && res.data) {
        setColleges(res.data.filter(item => item.type === 'college'));
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Associated Colleges</h1>
        <p>Partner colleges offering internship opportunities for students and young professionals.</p>
      </div>
      <div className="page-content">
        <section className="internship-section">
          <h2>Our Partner Colleges</h2>
          {loading ? <div>Loading...</div> : (
            <div className="schools-grid">
              {colleges.map(college => (
                <div className="school-card" key={college.id}>
                  <div className="school-image">
                    <img src={college.image?.formats?.small?.url ? `${process.env.REACT_APP_STRAPI_URL || 'https://umang-backend-ty0e.onrender.com'}${college.image.formats.small.url}` : '/assets/images/school-partner.jpg'} alt={college.schoolName} />
                  </div>
                  <div className="school-info">
                    <h3>{college.schoolName}</h3>
                    <p className="school-location">Location: {college.location}</p>
                    <p className="school-description">
                      {Array.isArray(college.description) ? college.description.map((desc, i) => desc.children?.map((child, j) => <span key={j}>{child.text}</span>)) : college.description}
                    </p>
                    <div className="internship-opportunities">
                      <h4>Available Internships:</h4>
                      <ul>
                        {college.programs?.split(',').map((prog, i) => <li key={i}>{prog.trim()}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AssociatedCollegesPage;
