// Sample Card Component - Card.js
import React from 'react';
import './card.css'; // Ensure you have relevant styles for Card

function Card({ title, priority, status, user }) {
  return (
    <div className="card">
      <h5>{title}</h5>
      <p>Status: {status}</p>
      <p>User: {user}</p>
      <p>Priority: {priority}</p> {/* Display numeric priority */}
    </div>
  );
}

export default Card;
