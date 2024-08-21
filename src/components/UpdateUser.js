import React, { useState, useEffect } from 'react';
import '../styles/UpdateUser.css';
import axios from '../axios';

function UpdateUser({ userId }) {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        role: '',
        mobileNumber: ''
    });

    useEffect(() => {
        axios.get(`/users/${userId}`)
            .then(response => setUser(response.data))
            .catch(error => console.error(error));
    }, [userId]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/users/${userId}`, user)
            .then(response => alert('User updated successfully'))
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update User</h2>
            <input type="text" name="firstName" value={user.firstName} onChange={handleChange} placeholder="First Name" required />
            <input type="text" name="lastName" value={user.lastName} onChange={handleChange} placeholder="Last Name" required />
            <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" required />
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
            <input type="text" name="role" value={user.role} onChange={handleChange} placeholder="Role" required />
            <input type="text" name="mobileNumber" value={user.mobileNumber} onChange={handleChange} placeholder="Mobile Number" required />
            <button type="submit">Update User</button>
        </form>
    );
}

export default UpdateUser;
