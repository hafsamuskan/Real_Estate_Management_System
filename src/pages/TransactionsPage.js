import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TransactionsPage.css';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions data
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/transactions/getall');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="transactions-page">
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            
            <th>Property</th>
            <th>Location</th>
            <th>Deal Type</th>
            <th>Client Name</th>
            <th>Client Email</th>
            <th>Agent Name</th>
            
            <th>Amount</th>
            <th>Date</th>
            
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
            <td>{transaction.id}</td>
              <td>{transaction.propertyType}</td>
              <td>{transaction.location}</td>
              <td>{transaction.dealType}</td>
              <td>{transaction.clientName}</td>
              <td>{transaction.clientEmail}</td>
              <td>{transaction.agentName}</td>
              
              <td>${transaction.transactionAmount}</td>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;