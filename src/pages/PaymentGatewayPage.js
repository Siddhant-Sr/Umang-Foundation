import React from 'react';
import '../styles/ProjectPages.css';

function PaymentGatewayPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Payment Gateway</h1>
        <p>Secure and easy donation platform to support our initiatives.</p>
      </div>
      <div className="page-content">
        <section className="payment-section">
          <h2>Make a Difference Today</h2>
          <div className="payment-options">
            <div className="payment-card">
              <h3>One-time Donation</h3>
              <p>Support our ongoing projects with a single contribution</p>
              <button className="donate-btn">Donate Now</button>
            </div>
            <div className="payment-card">
              <h3>Monthly Giving</h3>
              <p>Become a regular supporter and help us plan for the future</p>
              <button className="donate-btn">Start Monthly Giving</button>
            </div>
          </div>
          <div className="payment-info">
            <p>All donations are tax-deductible under Section 80G of the Income Tax Act.</p>
            <p>Your contribution helps us continue our mission of creating positive change in communities.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PaymentGatewayPage;