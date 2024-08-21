
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ManageListings.css'


const AddPropertyForm = ({ username }) => {
  const [propertyDetails, setPropertyDetails] = useState({
    imageUrl: null,
    bhkType: '',
    depositPrice: '',
    location: '',
    description: '',
    ownerName: '',
    ownerContact: '',
    propertyStatus: '',
  });

  const [propertyId, setPropertyId] = useState(null);

  const [imagePreviewUrl, setImagePreviewUrl] = useState(''); // State for image preview

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setPropertyDetails({
        ...propertyDetails,
        imageUrl: files[0],
      });
       // Create a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(files[0]);

    } else {
      setPropertyDetails({
        ...propertyDetails,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append('username', username);
    formData.append('imageUrl', propertyDetails.imageUrl);
    formData.append('bhkType', propertyDetails.bhkType);
    formData.append('depositPrice', propertyDetails.depositPrice);
    formData.append('location', propertyDetails.location);
    formData.append('description', propertyDetails.description);
    formData.append('ownerName', propertyDetails.ownerName);
    formData.append('ownerContact', propertyDetails.ownerContact);
    formData.append('propertyStatus', propertyDetails.propertyStatus);

    try {
      // Create the property first
      // const response = await axios.post('http://localhost:8080/api/properties/create', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',

      //   },
      // });

      const response = await axios.post('http://localhost:8080/api/properties/create?username=' + username, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

      if (response.status === 200) {
        const propertyId = response.data.id; // Assuming the response contains the created property ID
        alert('Property added successfully!');
        setPropertyDetails({
          imageUrl: null,
          bhkType: '',
          depositPrice: '',
          location: '',
          description: '',
          ownerName: '',
          ownerContact: '',
          propertyStatus: '',
        });
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };



  useEffect(() => {
        if (propertyId) {
          const fetchImage = async () => {
            try {
              // Fetch the image associated with the property
              const imageResponse = await axios.get(`http://localhost:8080/api/properties/image/${propertyId}`, {
                responseType: 'arraybuffer', // Important to handle binary data
              });
    
              if (imageResponse.status === 200) {
                // Convert the image data to a base64 string for display
                const imageBase64 = Buffer.from(imageResponse.data, 'binary').toString('base64');
                const imageSrc = `data:image/jpeg;base64,${imageBase64}`; // Adjust the MIME type if necessary
    
                // Display the image on the frontend
                document.getElementById('propertyImage').src = imageSrc; // Assuming you have an img element with this ID
              }
            } catch (error) {
              console.error('Error fetching image:', error);
            }
          };
    
          fetchImage();
        }
      }, [propertyId]); 

  return (
    <div class="add-property-container">
  <form class="add-property-form" onSubmit={handleSubmit}>
    <h2>Add Property</h2>
    <div class="form-group">
      <label htmlFor="imageUrl">Image</label>
      <input
        type="file"
        name="imageUrl"
        id="imageUrl"
        onChange={handleChange}
        required
      />
    </div>
    <div class="form-group">
      <label htmlFor="bhkType">BHK Type</label>
      <input
        type="text"
        name="bhkType"
        id="bhkType"
        placeholder="BHK Type"
        value={propertyDetails.bhkType}
        onChange={handleChange}
        required
      />
    </div>
    <div class="form-group">
      <label htmlFor="depositPrice">Deposit Price</label>
      <input
        type="text"
        name="depositPrice"
        id="depositPrice"
        placeholder="Deposit Price"
        value={propertyDetails.depositPrice}
        onChange={handleChange}
        required
      />
    </div>
    <div class="form-group">
      <label htmlFor="location">Location</label>
      <input
        type="text"
        name="location"
        id="location"
        placeholder="Location"
        value={propertyDetails.location}
        onChange={handleChange}
        required
      />
    </div>
    <div class="form-group">
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        placeholder="Description"
        value={propertyDetails.description}
        onChange={handleChange}
        required
      ></textarea>
    </div>
    <div class="form-group">
      <label htmlFor="ownerName">Owner Name</label>
      <input
        type="text"
        name="ownerName"
        id="ownerName"
        placeholder="Owner Name"
        value={propertyDetails.ownerName}
        onChange={handleChange}
        required
      />
    </div>
    <div class="form-group">
      <label htmlFor="ownerContact">Owner Contact</label>
      <input
        type="text"
        name="ownerContact"
        id="ownerContact"
        placeholder="Owner Contact"
        value={propertyDetails.ownerContact}
        onChange={handleChange}
        required
      />
    </div>
    <div class="form-group">
      <label htmlFor="propertyStatus">Property Status</label>
      <input
        type="text"
        name="propertyStatus"
        id="propertyStatus"
        placeholder="Property Status"
        value={propertyDetails.propertyStatus}
        onChange={handleChange}
        required
      />
    </div>
    <button type="submit" class="submit-btn">Add Property</button>
  </form>
</div>
  );
};


export default AddPropertyForm;
