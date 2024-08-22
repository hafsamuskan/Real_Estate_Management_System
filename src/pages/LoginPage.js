import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/loginsignup.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Admin');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!email) {
      tempErrors["email"] = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors["email"] = "Please enter a valid email address";
      isValid = false;
    }

   

    setErrors(tempErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        username: email,
        password: password,
        role: userType,
      });

      if (response.status === 200) {
        const userRole = response.data.role;
        const userName = response.data.name || email; // Use name if available, otherwise use email
        localStorage.setItem('username', userName);
        localStorage.setItem('role', userRole);
        localStorage.setItem('token', response.data.token); // Store the token for session management
        alert("Login Successful!");
        navigate(`/${userRole}-dashboard`);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Invalid email, password, or role');
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleLogin}>
        <select value={userType} onChange={(e) => setUserType(e.target.value)} className="input">
          <option value="Admin">Admin</option>
          <option value="Agent">Agent</option>
          <option value="Client">Client</option>
        </select>
        <div className="input-group">
          <input
            placeholder="Email address"
            className="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="input-group">
          <input
            placeholder="Password"
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div className="remember">
          <label><input type="checkbox"/> Remember me</label>
        </div>
        <button id="loginBtn" type="submit">Log in</button>
        <div className="register-link">
          <p>New user? <Link to="/register">Register</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
