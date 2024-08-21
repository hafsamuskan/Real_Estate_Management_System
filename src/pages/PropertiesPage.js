// src/pages/PropertiesPage.js
import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import '../styles/PropertiesPage.css'
import axios from 'axios';

const PropertiesPage = () => {

  const [properties, setProperties] = useState([]);
  // const properties = [
  //   {
  //     id: '02',
  //     name: '02 Home',
  //     location: 'Karnataka',
  //     agent: 'Nikita',
  //     date: '22-07-2022',
  //     image: '/images/property2.jpeg',
  //     bhkType: '2BHK',
  //     depositPrice: '₹80,000',
  //     ownerContact: '9876543211',
  //     propertyStatus: 'Rented',
  //   },
  //   {
  //     id: '01',
  //     name: '01 Homes',
  //     location: 'Kolhapur',
  //     agent: 'Shruti Tiwari',
  //     date: '22-07-2022',
  //     image: '/images/property1.jpeg',
  //     bhkType: '3BHK',
  //     depositPrice: '₹1,00,000',
  //     ownerContact: '9876543210',
  //     propertyStatus: 'Available',
  //   },
  //   {
  //     id: '02',
  //     name: '02 Home',
  //     location: 'Karnataka',
  //     agent: 'Nikita',
  //     date: '22-07-2022',
  //     image: '/images/property2.jpeg',
  //     bhkType: '2BHK',
  //     depositPrice: '₹80,000',
  //     ownerContact: '9876543211',
  //     propertyStatus: 'Rented',
  //   },
  //   {
  //     id: '02',
  //     name: '02 Home',
  //     location: 'Karnataka',
  //     agent: 'Nikita',
  //     date: '22-07-2022',
  //     image: '/images/property2.jpeg',
  //     bhkType: '2BHK',
  //     depositPrice: '₹80,000',
  //     ownerContact: '9876543211',
  //     propertyStatus: 'Rented',
  //   },
  //   {
  //     id: '01',
  //     name: '01 Homes',
  //     location: 'Kolhapur',
  //     agent: 'Shruti Tiwari',
  //     date: '22-07-2022',
  //     image: '/images/property1.jpeg',
  //     bhkType: '3BHK',
  //     depositPrice: '₹1,00,000',
  //     ownerContact: '9876543210',
  //     propertyStatus: 'Available',
  //   },
  //   {
  //     id: '01',
  //     name: '01 Homes',
  //     location: 'Kolhapur',
  //     agent: 'Shruti Tiwari',
  //     date: '22-07-2022',
  //     image: '/images/property1.jpeg',
  //     bhkType: '3BHK',
  //     depositPrice: '₹1,00,000',
  //     ownerContact: '9876543210',
  //     propertyStatus: 'Available',
  //   },

  //   // Add more properties as needed
  // ];

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
