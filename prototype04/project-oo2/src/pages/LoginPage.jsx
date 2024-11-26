// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../components/UserContext'; // Import useUser
import './AuthForm.css';

const LoginPage = () => {
  const { setUser } = useUser(); // Get setUser from context
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login - Semonggoh Wildlife Centre";
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/prototype04/project-oo2/src/backend/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    
    if (data.status === 'success') {
      const userData = {
        id: data.id,
        username: data.username,
        role_id: data.role_id,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData); // Update user state in context

      if (data.role_id === 1) {
        navigate('/admin'); // Admin role
      } else {
        navigate('/main-menu'); // User role
      }
    } else {
      setErrorMessage(data.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">Login</button>
        </div>
        <div className="register-redirect">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
