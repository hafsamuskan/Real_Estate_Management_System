import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Search, Edit, Trash2, Plus } from 'lucide-react';
import AddPropertyForm from './AddPropertyForm';
import '../styles/ManageListings.css';

const API_BASE_URL = 'http://localhost:8080/api/properties';

const ManageListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState([]);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
  const [agentName, setAgentName] = useState('');
  const [username, setUsername] = useState('');

  const fetchProperties = useCallback(() => {
    const token = localStorage.getItem('token');
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser && token) {
      const ownerName = loggedInUser.split('@')[0];
      axios.get(`${API_BASE_URL}/properties`, {
        params: { ownerName },
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setProperties(response.data);
        setFilteredProperties(response.data);
      })
      .catch(error => console.error('Error fetching properties:', error));
    }
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser) {
      const ownerName = loggedInUser.split('@')[0];
      const capitalizedName = ownerName.charAt(0).toUpperCase() + ownerName.slice(1);
      setAgentName(capitalizedName);
      setUsername(loggedInUser);
    }
    fetchProperties();
  }, [fetchProperties]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = properties.filter(property => 
      property.bhkType.toLowerCase().includes(term) ||
      property.location.toLowerCase().includes(term) ||
      property.propertyStatus.toLowerCase().includes(term)
    );
    setFilteredProperties(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveClick = () => {
    axios.put(`${API_BASE_URL}/update/${editingPropertyId}`, editFormData, { params: { username } })
      .then(response => {
        setEditingPropertyId(null);
        fetchProperties();
      })
      .catch(error => console.error('Error updating property:', error));
  };

  const handleEditClick = (property) => {
    setEditingPropertyId(property.id);
    setEditFormData(property);
  };

  const handleDeleteClick = (propertyId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (confirmDelete) {
      axios.delete(`${API_BASE_URL}/delete/${propertyId}`, { params: { username } })
        .then(response => {
          if (response.status === 200) {
            fetchProperties();
          }
        })
        .catch(error => console.error('Error deleting property:', error));
    }
  };

  const handlePropertyAdded = () => {
    setShowAddPropertyForm(false);
    fetchProperties();
  };

  return (
    <div className="manage-listings">
      <h2>Manage Listings</h2>
      <div className="listings-header">
        <h3>Property Listings for {agentName}</h3>
        <button className="btn btn-add" onClick={() => setShowAddPropertyForm(true)}>
          <Plus size={16} /> Add Property
        </button>
      </div>
      {showAddPropertyForm && (
        <AddPropertyForm
          username={username}
          onClose={() => setShowAddPropertyForm(false)}
          onPropertyAdded={handlePropertyAdded}
        />
      )}

      <div className="search-filter">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="search-icon" size={20} />
        </div>
      </div>

      <div className="table-container">
        <table className="property-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>BHK Type</th>
              <th>Deposit Price</th>
              <th>Location</th>
              <th>Description</th>
              <th>Owner Contact</th>
              <th>Property Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((property) => (
              <tr key={property.id}>
                <td>
                  <img src={`data:image/jpeg;base64,${property.imageUrl}`} alt="Property" className="property-image" />
                </td>
                <td>{editingPropertyId === property.id ? (
                  <input type="text" name="bhkType" value={editFormData.bhkType} onChange={handleInputChange} />
                ) : property.bhkType}</td>
                <td>{editingPropertyId === property.id ? (
                  <input type="text" name="depositPrice" value={editFormData.depositPrice} onChange={handleInputChange} />
                ) : property.depositPrice}</td>
                <td>{editingPropertyId === property.id ? (
                  <input type="text" name="location" value={editFormData.location} onChange={handleInputChange} />
                ) : property.location}</td>
                <td>{editingPropertyId === property.id ? (
                  <textarea name="description" value={editFormData.description} onChange={handleInputChange} />
                ) : property.description}</td>
                <td>{editingPropertyId === property.id ? (
                  <input type="text" name="ownerContact" value={editFormData.ownerContact} onChange={handleInputChange} />
                ) : property.ownerContact}</td>
                <td>{editingPropertyId === property.id ? (
                  <input type="text" name="propertyStatus" value={editFormData.propertyStatus} onChange={handleInputChange} />
                ) : property.propertyStatus}</td>
                <td className="actions">
                  {editingPropertyId === property.id ? (
                    <button className="btn btn-save" onClick={handleSaveClick}>Save</button>
                  ) : (
                    <div className="action-buttons">
                      <button className="btn btn-edit" onClick={() => handleEditClick(property)}><Edit size={20} /></button>
                      <button className="btn btn-delete" onClick={() => handleDeleteClick(property.id)}><Trash2 size={20} /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageListings;