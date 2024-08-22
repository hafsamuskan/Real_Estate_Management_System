import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import '../styles/PropertiesPage.css'
import axios from 'axios';

const PropertiesPage = () => {

  const [properties, setProperties] = useState([]);
 

  useEffect(() => {
    // Fetch all properties
    axios.get('http://localhost:8080/api/properties/all')
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => console.error('Error fetching properties:', error));
  }, []);

   return (
    <div className="properties-page">
    <h1>Available Properties</h1>
    <div className="property-grid">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  </div>
   )
  
};

export default PropertiesPage;
