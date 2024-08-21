import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Header.css';
const Header = () => {
const navigate = useNavigate();
const isLoggedIn = localStorage.getItem('token');
const userRole = localStorage.getItem('role');
const [isMenuOpen, setIsMenuOpen] = useState(false);
const handleLogout = () => {
localStorage.removeItem('token');
localStorage.removeItem('username');
localStorage.removeItem('role');
navigate('/login');
};
const toggleMenu = () => {
setIsMenuOpen(!isMenuOpen);
};
return (
<header className="header">
<h1>REALESTATE</h1>
<nav className={isMenuOpen ? 'open' : ''}>
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/properties">Properties</Link></li>
        <li><Link to="/agents">Agents</Link></li>
        {isLoggedIn ? (
        <>
        <li><Link to={`/${userRole}-dashboard`}>{userRole} Dashboard</Link></li>
        <li onClick={handleLogout}>Logout</li>
        </>
        ) : (
        <li><Link to="/login">Login</Link></li>
        )}
    </ul>
</nav>
<div className="burger-icon" onClick={toggleMenu}>
{isMenuOpen ? <FaTimes /> : <FaBars />}
</div>
</header>
);
};
export default Header;
