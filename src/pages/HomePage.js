import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import InstallmentCalculator from '../components/InstallmentCalculator';
import FeaturedProperty from '../components/FeaturedProperty';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/HomePage.css';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const featuredProperties = [
    { id: '01', name: '01 Apartment', image: '/images/featured1.jpeg' },
    { id: '02', name: '02 Apartments', image: '/images/featured2.jpeg' },
    { id: '03', name: 'Saravanan Homes', image: '/images/featured3.jpeg' },
  ];

  useEffect(() => {
    axios.get('http://localhost:8080/api/properties/all')
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => console.error('Error fetching properties:', error));
  }, []);

  const handleSearch = () => {
    return properties.filter((property) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        (property.bhk_type || '').toLowerCase().includes(searchLower) ||
        (property.location || '').toLowerCase().includes(searchLower) ||
        (property.owner_name || '').toLowerCase().includes(searchLower) ||
        (property.property_status || '').toLowerCase().includes(searchLower)
      );
    });
  };

  const filteredProperties = handleSearch();

  return (
    <div className="home-page">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="main-content">
        <div className="properties-grid">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
        <div className="sidebar">
          <InstallmentCalculator />
          <div className="featured-properties">
            <h2>Featured Properties</h2>
            {featuredProperties.map((property) => (
              <FeaturedProperty key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;