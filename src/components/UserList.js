import React, { useState, useEffect } from 'react';
import '../styles/UserList.css';
import axios from '../axios';

function UserList({ onEdit, onDelete }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.firstName} {user.lastName}
                        <button onClick={() => onEdit(user.id)}>Edit</button>
                        <button onClick={() => onDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;

