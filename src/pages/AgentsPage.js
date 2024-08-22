import React from 'react';
import AgentCard from '../components/AgentCard';
import '../styles/AgentsPage.css';

const AgentsPage = () => {
  
  const agents = [
    {
      id: 1,
      name: "Nikita",
      email: "Nikita@realestate.com",
      phone: "+1 (123) 456-7890",
      specialization: "Residential Properties",
      image: "/images/Nikita1.jpg"
    },
    {
      id: 2,
      name: "Hafsa",
      email: "hafsa@realestate.com",
      phone: "+1 (345) 678-9012",
      specialization: "Luxury Homes",
      image: "/images/hafsa.jpg"
    },
    {
      id: 3,
      name: "Thiricksha",
      email: "thiricksha@realestate.com",
      phone: "+1 (345) 678-6012",
      specialization: "Luxury Apartments",
      image: "/images/Thiriksha.jpg"
    },
    {
      id: 4,
      name: "Saravanan",
      email: "saravanan@realestate.com",
      phone: "+1 (345) 678-8012",
      specialization: "Residential Properties",
      image: "/images/Saravanan2.jpg"
    },

  ];

  return (
    <div className="agents-page">
      <h1>Our Real Estate Agents</h1>
      <div className="agents-grid">
        {agents.map(agent => (
          <AgentCard key={agent.id} {...agent} />
        ))}
      </div>
    </div>
  );
};

export default AgentsPage;
