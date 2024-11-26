import React, { useState, useEffect } from 'react';
import './DonationPage.css';
import donationsImage from '../assets/donations.jpg'; // Image for the banner background
import axios from 'axios'; // Import axios for making requests

const DonationPage = () => {
  useEffect(() => {
    document.title = "Donation - Semonggoh Wildlife Centre";
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    message: '',
    donation_date: '', // Add the donation_date field
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    setIsLoading(true); // Start loading

    try {
      const response = await axios.post('/prototype04/project-oo2/src/backend/donation.php', formData, {
        headers: {
          'Content-Type': 'application/json', // Use application/json for better handling
        },
      });
      
      if (response.data.status === 'success') {
        alert('Thank you for your donation!');
        setFormData({
          name: '',
          email: '',
          amount: '',
          message: '',
          donation_date: '', // Reset the donation_date field
        });
      } else {
        setErrorMessage(response.data.message); // Show error message from backend
      }
    } catch (error) {
      setErrorMessage('There was an error processing your donation.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="donation-page">
      {/* Banner Section */}
      <div className="hero-section" style={{ backgroundImage: `url(${donationsImage})` }}>
        <div className="hero-text-container">
          <h1 className="hero-title">Support Our Cause</h1>
          <p className="hero-description">Your contribution makes a difference!</p>
        </div>
      </div>

      {/* Donation Form Section */}
      <form onSubmit={handleSubmit} className="donation-form">
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Show error message */}
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Donation Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
            placeholder="Enter amount"
          />
        </label>
        <label>
          Donation Date: {/* New input field for donation date */}
          <input
            type="date"
            name="donation_date"
            value={formData.donation_date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Message (optional):
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message here..."
          />
        </label>
        <div className="donation-options">
          <button type="button" onClick={() => setFormData({ ...formData, amount: '10' })}>$10</button>
          <button type="button" onClick={() => setFormData({ ...formData, amount: '25' })}>$25</button>
          <button type="button" onClick={() => setFormData({ ...formData, amount: '50' })}>$50</button>
        </div>
        <button type="submit" className="donate-button" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Donate Now'}
        </button>
      </form>
    </div>
  );
};

export default DonationPage;
