// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/create-agent">Create Agent</Link></li>
        <li><Link to="/create-client">Create Client</Link></li>
        <li><Link to="/edit-agent">Edit Agent</Link></li>
        <li><Link to="/edit-client">Edit Client</Link></li>
        <li><Link to="/delete-agent">Delete Agent</Link></li>
        <li><Link to="/delete-client">Delete Client</Link></li>
        <li><Link to="/view-user-list">View User List</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
