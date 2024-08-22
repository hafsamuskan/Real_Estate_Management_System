import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/TransactionPage.css';

const TransactionPage = () => {
  const location = useLocation();
  const { property } = location.state || {};

  const [transactionData, setTransactionData] = useState({
    date: new Date().toISOString().split('T')[0],
    location: property?.location || '',
    propertyType: '',
    bhkType: property?.bhkType || '',
    dealType: '',
    transactionAmount: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Transaction data:', transactionData);
  };

  return (
    <div className="transaction-page">
      <h1>Transaction Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={transactionData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={transactionData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="propertyType">Property Type:</label>
          <input
            type="text"
            id="propertyType"
            name="propertyType"
            value={transactionData.propertyType}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bhkType">BHK Type:</label>
          <input
            type="text"
            id="bhkType"
            name="bhkType"
            value={transactionData.bhkType}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dealType">Deal Type:</label>
          <select
            id="dealType"
            name="dealType"
            value={transactionData.dealType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Deal Type</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="transactionAmount">Transaction Amount:</label>
          <input
            type="number"
            id="transactionAmount"
            name="transactionAmount"
            value={transactionData.transactionAmount}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Complete Transaction</button>
      </form>
    </div>
  );
};

export default TransactionPage;
