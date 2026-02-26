import React, { useState, useEffect } from 'react';
import '../styles/GoverningBoardMember.css';
import { getBoardMembers } from '../utils/api';
import { FALLBACK_API_URL } from '../config/api';

function GoverningBoardMemberPage() {
  const [boardMembers, setBoardMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBoardMembers = async () => {
      const data = await getBoardMembers();
      if (data && data.data) {
        const baseUrl = data._baseUrl || FALLBACK_API_URL;
        
        const boardMemberList = data.data.map(boardMember => {
          const attrs = boardMember?.attributes || boardMember;
          const name = attrs?.name || 'Unknown Board Member';
          const position = attrs?.position || '';
          
          let imageUrl = '/assets/images/board-member-placeholder.jpg';
          if (attrs?.image) {
            if (attrs.image.url) {
              imageUrl = `${baseUrl}${attrs.image.url}`;
            } else if (attrs.image.data?.attributes?.url) {
              imageUrl = `${baseUrl}${attrs.image.data.attributes.url}`;
            }
          }
          
          let description = '';
          let descriptionParagraphs = [];
          if (attrs?.description) {
            if (Array.isArray(attrs.description)) {
              descriptionParagraphs = attrs.description
                .map(block => block?.children?.map(child => child.text).join('') || '')
                .filter(text => text.trim() !== '');
              description = descriptionParagraphs.join(' ');
            } else if (typeof attrs.description === 'string') {
              description = attrs.description;
              descriptionParagraphs = [attrs.description];
            }
          }
          
          const order = attrs?.order || 999;
          const email = attrs?.email || '';
          const phone = attrs?.phone || '';
          const linkedin = attrs?.linkedin || '';

          return {
            id: boardMember?.id || boardMember?.documentId,
            name,
            position,
            image: imageUrl,
            description,
            descriptionParagraphs,
            order,
            email,
            phone,
            linkedin
          };
        });
        
        boardMemberList.sort((a, b) => a.order - b.order);
        setBoardMembers(boardMemberList);
      } else {
        setBoardMembers([]);
      }
      setLoading(false);
    };
    loadBoardMembers();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1>Governing Board Member</h1>
          <p>Meet the dedicated members of our governing board who oversee our operations.</p>
        </div>
        <div className="page-content">
          <div className="loading-message">Loading board members...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Governing Board Member</h1>
        <p>Meet the dedicated members of our governing board who oversee our operations.</p>
      </div>
      <div className="page-content">
        <section className="board-members-section">
          <h2>Our Governing Board Members</h2>
          {boardMembers.length > 0 ? (
            <div className="board-members-grid">
              {boardMembers.map((boardMember) => (
                <div className="board-member-card" key={boardMember.id}>
                  <div className="board-member-image">
                    <img src={boardMember.image} alt={boardMember.name} />
                  </div>
                  <div className="board-member-info">
                    <h3>{boardMember.name}</h3>
                    {boardMember.position && (
                      <p className="board-member-position">{boardMember.position}</p>
                    )}
                    {boardMember.description && boardMember.descriptionParagraphs && boardMember.descriptionParagraphs.length > 0 && (
                      <div className="board-member-description">
                        {boardMember.descriptionParagraphs.map((para, idx) => (
                          <p key={idx}>{para}</p>
                        ))}
                      </div>
                    )}
                    {(boardMember.email || boardMember.phone || boardMember.linkedin) && (
                      <div className="board-member-contact">
                        {boardMember.email && (
                          <a href={`mailto:${boardMember.email}`} className="board-member-contact-link">
                            {boardMember.email}
                          </a>
                        )}
                        {boardMember.linkedin && (
                          <a 
                            href={boardMember.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="board-member-linkedin"
                          >
                            LinkedIn
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-board-members">No board members found.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default GoverningBoardMemberPage;