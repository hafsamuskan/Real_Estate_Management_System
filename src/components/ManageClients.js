import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ManageClients.css';

const ManageClients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/agents/interested-tenants');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="manage-clients">
      <h2>Manage Clients</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td data-label="Name">{client.name}</td>
                <td data-label="Email">{client.email}</td>
                <td data-label="Phone">{client.phone}</td>
                <td data-label="Actions">
                  <div className="b">
                  <button styles= 'padding: 5px 8px;' className="btn btn-approve">Approve</button>
                  <button className="btn btn-reject">Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClients;