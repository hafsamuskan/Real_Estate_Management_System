import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PropertyCard.css';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate('/order-summary', { state: { property } });
  };

  const handleShowMore = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div className="property-card">
      {property.imageUrl && (
        <img
          src={`data:image/jpeg;base64,${property.imageUrl}`}
          alt={property.bhkType}
          className="property-image"
        />
      )}
      <div className="property-content">
        
        <h2 className="property-location">{property.location}</h2>
        <p className="property-title">{property.bhkType}</p>
        
        <div className="property-details">
          {/* <p><strong>By:</strong> {property.ownerName}</p> */}
          <p><strong>Deposit:</strong> ₹{property.depositPrice}</p>
          <p><strong>Status:</strong> {property.propertyStatus}</p>
        </div>
        <div className="button-container">
          <button className="show-more-button" onClick={handleShowMore}>Show More</button>
          <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;