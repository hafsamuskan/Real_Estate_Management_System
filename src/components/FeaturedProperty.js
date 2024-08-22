import React from 'react';
import '../styles/FeaturedProperty.css';

const FeaturedProperty = ({ property }) => {
  return (
    <div className="featured-property">
      <img src={property.image} alt={property.name} className="featured-property-image" />
      <p>{property.name}</p>
    </div>
  );
};

export default FeaturedProperty;
