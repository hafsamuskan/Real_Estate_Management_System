import React from 'react';
import '../styles/DeleteUser.css';
import axios from '../axios';

function DeleteUser({ userId }) {
    const handleDelete = () => {
        axios.delete(`/users/${userId}`)
            .then(response => alert('User deleted successfully'))
            .catch(error => alert('User not found'));
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete User</button>
        </div>
    );
}

export default DeleteUser;
