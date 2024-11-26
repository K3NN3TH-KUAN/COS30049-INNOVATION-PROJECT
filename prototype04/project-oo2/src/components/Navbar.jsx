// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo-s.png";
import { useUser } from '../components/UserContext'; // Import the context

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useUser(); // Get user and logout from context
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/prototype04/project-oo2/src/backend/logout.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent with the request
      });
  
      const result = await response.json();
      if (result.success) {
        logout(); // Call the logout function from context
        navigate('/'); // Redirect to home page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if user is authenticated and determine roleId
  const isAuthenticated = !!user; // true if user exists
  const roleId = user ? user.role_id : null; // Null if no user is logged in

  return (
    <nav className={`navbar ${roleId === 1 ? 'navbar-admin' : roleId === 2 ? 'navbar-user' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={logo} alt="Logo" />
        </Link>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/info" className="nav-links" onClick={closeMobileMenu}>Info</Link>
          </li>
          <li className="nav-item">
            <Link to="/donate" className="nav-links" onClick={closeMobileMenu}>Donate</Link>
          </li>
          <li className="nav-item">
            <Link to="/edu" className="nav-links" onClick={closeMobileMenu}>Education</Link>
          </li>

          {/* Conditional rendering based on role_id */}
          {isAuthenticated && roleId === 1 && (
            <li className="nav-item">
              <Link to="/admin" className="nav-links" onClick={closeMobileMenu}>Admin Panel</Link>
            </li>
          )}
          {isAuthenticated && roleId === 2 && (
            <li className="nav-item">
              <Link to="/main-menu" className="nav-links" onClick={closeMobileMenu}>Main Menu</Link>
            </li>
          )}

          {/* Authentication Links */}
          {!isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links" onClick={closeMobileMenu}>Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links" onClick={closeMobileMenu}>Register</Link>
              </li>
            </>
          ) : (
            <li className="nav-item" onClick={handleLogout}>
              <span className="nav-links" style={{ cursor: 'pointer' }}>Logout</span>
            </li>
          )}
        </ul>

        <div className="menu-icon" onClick={toggleMobileMenu}>
          <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
