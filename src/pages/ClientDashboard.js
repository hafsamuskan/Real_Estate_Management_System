import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ClientDashboard.css';
import PropertyCard from '../components/PropertyCard';

const API_BASE_URL = 'http://localhost:8080/api/properties';

const ClientDashboard = () => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username'); 
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (username && role === 'Client' && token) {
      const name = username.split('@')[0];
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      setDisplayName(capitalizedName);

      axios.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );

      axios.get(`${API_BASE_URL}/view`, { params: { username } })
        .then(response => {
          setFilteredProperties(response.data);
        })
        .catch(error => console.error('Error fetching properties:', error));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="client-dashboard">
      <header className="dashboard-header">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <h1>Welcome, {displayName}</h1>
            <p>Client</p>
          </div>
        </div>
      </header>

       <div className="properties-list">
        <h2>Listing All Properties</h2>
         <div className="properties-grid">
           {filteredProperties.length > 0 ? (
            filteredProperties.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;

