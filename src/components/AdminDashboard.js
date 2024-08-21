import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/AdminDashboard.css";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: '', lastName: '', mobileNumber: '', username: '', password: '', role: ''
  });
  const [editingUser, setEditingUser] = useState(null);
  const [editUserData, setEditUserData] = useState(null);
  const [displayName, setDisplayName] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    
    if (loggedInUser && role === 'Admin' && token) {
      const name = loggedInUser.split('@')[0];
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      setDisplayName(capitalizedName);

      axios.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );

      fetchUsers();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/admin/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ firstName: '', lastName: '', mobileNumber: '', username: '', password: '', role: '' });
      alert("User added successfully.")
    } catch (error) {
      console.error('Error creating user', error.response ? error.response.data : error.message);
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/admin/users/${id}`, editUserData);
      setUsers(users.map(user => (user.id === id ? response.data : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <h1>Welcome, {displayName}</h1>
            <p>Admin</p>
          </div>
        </div>
      </header>

      <main>
        <h2>User Management</h2>
        
        <div className="user-form">
          <h3>Create User</h3>
          <input type="text" placeholder="First Name" value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
          <input type="text" placeholder="Last Name" value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
          <input type="text" placeholder="Mobile Number" value={newUser.mobileNumber} onChange={(e) => setNewUser({ ...newUser, mobileNumber: e.target.value })} />
          <input type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
          <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
          <input type="text" placeholder="Role" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} />
          <button onClick={handleCreateUser}>Create User</button>
        </div>

        <div>
          <h3>Users List</h3>
          <ul className="users-list">
            {users.map(user => (
              <li key={user.id}>
                <span>{user.firstName} - {user.lastName} - {user.mobileNumber} - {user.username} - {user.role}</span>
                <div>
                  <button onClick={() => { setEditingUser(user.id); setEditUserData(user); }}>Edit</button>
                  <button className="delete" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {editingUser && (
          <div className="user-form">
            <h3>Edit User</h3>
            <input type="text" placeholder="First Name" value={editUserData.firstName} onChange={(e) => setEditUserData({ ...editUserData, firstName: e.target.value })} />
            <input type="text" placeholder="Last Name" value={editUserData.lastName} onChange={(e) => setEditUserData({ ...editUserData, lastName: e.target.value })} />
            <input type="text" placeholder="Mobile Number" value={editUserData.mobileNumber} onChange={(e) => setEditUserData({ ...editUserData, mobileNumber: e.target.value })} />
            <input type="text" placeholder="Username" value={editUserData.username} onChange={(e) => setEditUserData({ ...editUserData, username: e.target.value })} />
            <input type="password" placeholder="Password" value={editUserData.password} onChange={(e) => setEditUserData({ ...editUserData, password: e.target.value })} />
            <input type="text" placeholder="Role" value={editUserData.role} onChange={(e) => setEditUserData({ ...editUserData, role: e.target.value })} />
            <button onClick={() => handleUpdateUser(editingUser)}>Update User</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
