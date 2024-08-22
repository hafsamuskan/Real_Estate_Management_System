import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/PropertyDetails.css';
import '../styles/PopupForm.css';

const PropertyDetails = () => {
 
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [tenantName, setTenantName] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [tenantEmail, setTenantEmail] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        let propertyData;
        
        if (location.state && location.state.property) {
          propertyData = location.state.property;
        } else {
          const response = await axios.get(`http://localhost:8080/api/properties/get/${id}`);
          propertyData = response.data;
        }
        
        setProperty(propertyData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property details:', error);
        setError('Failed to load property details. Please try again.');
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, location.state]);

  const amenities = [
    "Air Conditioning", "Barbeque", "Built-In Wardrobes",
    "Clinic", "Dishwasher", "Fireplace",
    "Floor Coverings", "Internet", "Park",
    "School", "Supermarket/Store", "Transportation Hub"
  ];

  const facilities = [
    { name: "FC", value: "Ceiling Fan(s), Central" },
    { name: "Acres", value: "14" },
    { name: "Acres Source", value: "20" },
    { name: "Cross Streets", value: "Stall Shower" }
  ];

  
  const handleContactOwner = async () => {
    setShowForm(true);
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const tenantData = {
        name: tenantName,
        phone: tenantPhone,
        email: tenantEmail,
        propertyId: id,
      };
      await axios.post('http://localhost:8080/api/agents/interested-tenants', tenantData);
      alert('Your interest has been submitted successfully.');
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit your interest. Please try again.');
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!property) return <div>No property details found.</div>;

  return (
    <div className="property-details-container">
      <div className="property-details">
        <h1>{property.bhk_type}</h1>
        {property.image_url && (
          <img
            src={`data:image/jpeg;base64,${property.image_url}`}
            alt={property.bhk_type}
            className="property-image"
          />
        )}
        <div className="pdt">
        <div className="details-container">
          <p><strong>Location:</strong> {property.location}</p>
          <p><strong>Owner:</strong> {property.ownerName}</p>
          <p><strong>Deposit:</strong> ₹{property.depositPrice}</p>
          <p><strong>Contact:</strong> {property.ownerContact}</p>
          <p><strong>Status:</strong> {property.propertyStatus}</p>
          <p><strong>Description:</strong> {property.description || 'No description available.'}</p>
          
          {/* Amenities Section */}
          <div className="amenities-section">
            <h2>Amenities</h2>
            <hr></hr>
            <div className="amenities-grid">
              {amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <span className="checkmark">✓</span> {amenity}
                </div>
              ))}
            </div>
          </div>

          

          {/* Facilities Section */}
          <div className="facilities-section">
            <h2>Facilities</h2>
            <hr></hr>
            <div className="facilities-list">
              {facilities.map((facility, index) => (
                <div key={index} className="facility-item">
                  <span className="checkmark">✓</span> {facility.name}: {facility.value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="agent-card">
       
        <h2>Hafsa</h2>
        <p><strong>Email:</strong> hafsa@gmail.com</p>
        <p><strong>Phone:</strong> 9878678956</p>
        <p><strong>Specialization:</strong> Luxury Homes</p>
        <button onClick={handleContactOwner}>Contact Owner</button>
      </div>
      </div>
      {/* Pop-Up Form */}
      {showForm && (
        <div className="popup-form">
          <form onSubmit={handleSubmitForm}>
            <h2>Contact Owner</h2>
            <label>
              Name:
              <input
                type="text"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                required
              />
            </label>
            <label>
              Email ID:
              <input
                type="email"
                value={tenantEmail}
                onChange={(e) => setTenantEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                value={tenantPhone}
                onChange={(e) => setTenantPhone(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
