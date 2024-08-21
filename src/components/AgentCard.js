// src/components/AgentCard.js
import React from 'react';

const AgentCard = ({ name, email, phone, specialization, image }) => {
  return (
    <div className="agent-card">
      <img src={image} alt={name} className="agent-image" />
      <h2>{name}</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Specialization:</strong> {specialization}</p>
    </div>
  );
};

export default AgentCard;