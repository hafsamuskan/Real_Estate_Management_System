import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/OrderSummary.css';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property } = location.state;
  const [displayName, setDisplayName] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (username && role === 'Client' && token) {
      const name = username.split('@')[0];
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      setDisplayName(capitalizedName);
      setClientEmail(username);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleConfirmPurchase = async () => {
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const transactionData = {
        date: currentDate,
        dealType: property.propertyStatus,
        location: property.location,
        propertyType: property.bhkType,
        transactionAmount: property.depositPrice,
        agentName: property.ownerName,
        clientName: displayName,
        clientEmail: clientEmail
      };

      console.log('Sending transaction data:', transactionData);

      const response = await axios.post('http://localhost:8080/api/transactions/save', transactionData);
      console.log('Transaction saved:', response.data);
      alert("Transaction is done successfully");
      navigate('/');
    } catch (error) {
      console.error('Error saving transaction:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        alert(`Error occurred while processing the transaction: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert("No response received from the server. Please try again later.");
      } else {
        console.error('Error message:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleCancelPurchase = () => {
    navigate('/');
  };

  return (
    <div className="order-summary-page">
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
              Deal Type: <i className="info-icon">{property.propertyStatus}</i>
            </span>
            <span className="item-price">₹0.00</span>
          </div>
        </div>
        <div className="summary-total">
          <span className="total-label">Total:</span>
          <span className="total-price">{property.depositPrice}</span>
        </div>
        <div className="summary-actions">
          <button className="confirm-button" onClick={handleConfirmPurchase}>Confirm Purchase</button>
          <button className="cancel-button" onClick={handleCancelPurchase}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;