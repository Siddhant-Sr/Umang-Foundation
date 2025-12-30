import React from 'react';
import '../styles/GoverningBoardMember.css';

function GoverningBoardMemberPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Governing Board Member</h1>
        <p>Meet the dedicated members of our governing board who oversee our operations.</p>
      </div>
      <div className="page-content">
        <section className="board-members-section">
          <h2>Our Governing Board Members</h2>
          <div className="board-members-grid">
            {/* Board member profiles will be added here */}
            <div className="board-member-card">
              <div className="board-member-image">
                <img src="/assets/images/board-member-placeholder.jpg" alt="Board Member" />
              </div>
              <div className="board-member-info">
                <h3>Board Member Name</h3>
                <p className="board-member-position">Position</p>
                <p className="board-member-description">
                  Brief description about the board member's expertise and role in governance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default GoverningBoardMemberPage;