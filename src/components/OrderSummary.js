import React from 'react';
import '../styles/OrderSummary.css';

const OrderSummary = ({ property, onConfirm, onCancel }) => {
  const total = parseFloat(property.depositPrice);
  const username = localStorage.getItem('username'); 

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="summary-items">
        <div className="summary-item">
          <span className="item-name">{property.name} - {property.location}</span>
          <span className="item-price">{property.depositPrice}</span>
        </div>
        <div className="summary-item">
          <span className="item-name">BHK Type:</span>
          <span className="item-value">{property.bhkType}</span>
        </div>
        <div className="summary-item">
          <span className="item-name">Owner Name:</span>
          <span className="item-value">{property.ownerName}</span>
        </div>

        <div className="summary-item">
          <span className="item-name">Owner Contact:</span>
          <span className="item-value">{property.ownerContact}</span>
        </div>
        <div className="summary-item handling-fee">
          <span className="item-name">
            Deal Type : <i className="info-icon">{property.propertyStatus}</i>
          </span>
          <span className="item-price">₹0.00</span>
        </div>
      </div>
      <div className="summary-total">
        <span className="total-label">Total:</span>
        <span className="total-price"> {property.depositPrice}</span>
      </div>
      <div className="summary-actions">
        <button className="confirm-button" onClick={onConfirm}>Confirm Purchase</button>
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default OrderSummary;