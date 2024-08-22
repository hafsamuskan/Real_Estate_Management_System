import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegistrationForm.css';
import '../pages/LoginPage';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    role: 'client', 
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]{10}$/;

    switch (name) {
      case 'firstName':
        if (!value.trim()) error = 'First Name is required';
        break;
      case 'lastName':
        if (!value.trim()) error = 'Last Name is required';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!emailPattern.test(value)) error = 'Invalid email format';
        break;
      case 'mobileNumber':
        if (!value) error = 'Mobile Number is required';
        else if (!mobilePattern.test(value)) error = 'Invalid mobile number format';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        break;
      
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    const formErrors = Object.keys(formData).reduce((acc, field) => {
      const error = validateField(field, formData[field]);
      if (error) acc[field] = error;
      return acc;
    }, {});

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    
    axios.post('http://localhost:8080/api/users/register', formData)
      .then(response => {
        console.log(response.data);
        navigate('/login');
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="First Name"
      />
      {errors.firstName && <p className="error">{errors.firstName}</p>}

      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Last Name"
      />
      {errors.lastName && <p className="error">{errors.lastName}</p>}

      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="username"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter email"
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <label htmlFor="mobileNumber">Mobile Number</label>
      <input
        type="text"
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter Mobile Number"
      />
      {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Password"
      />
      {errors.password && <p className="error">{errors.password}</p>}

     
      <label htmlFor="role">Role</label>
      <select name="role" value={formData.role} onChange={handleChange} onBlur={handleBlur}>
        <option value="client">Client</option>
        <option value="agent">Agent</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationForm;
