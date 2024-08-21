import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AgentDashboard.css';

const AgentDashboard = () => {
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();
  const agentRatings = 4.8;
  const listingsCount = 45;
  const clientsCount = 28;
  const transactionsCount = 120;

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    
    if (loggedInUser && role === 'Agent' && token) {
      const name = loggedInUser.split('@')[0];
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      setDisplayName(capitalizedName);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className='agent-dashboard'>
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <h1>Welcome, {displayName}</h1>
            <p>Real Estate Agent</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn" onClick={() => navigate('/listings')}>Manage Listings</button>
          <button className="btn btn-dark" onClick={() => navigate('/clients')}>Manage Clients</button>
          <button className="btn" onClick={() => navigate('/transactions')}>View Transactions</button>
        </div>
      </header>

      <main className="dashboard-main">
        <h2>Agent Dashboard</h2>
        <p>Select an option above to manage your listings, clients, or view transactions.</p>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Agent Ratings</h3>
            <p>{agentRatings} out of 5 stars</p>
          </div>
          <div className="stat-card">
            <h3>Listings</h3>
            <p>{listingsCount}</p>
          </div>
          <div className="stat-card">
            <h3>Clients</h3>
            <p>{clientsCount}</p>
          </div>
          <div className="stat-card">
            <h3>Transactions</h3>
            <p>{transactionsCount}</p>
          </div>
    </div>
      </main>
    </div>
    </div>
  );
};

export default AgentDashboard;