import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../components/UserContext';
import './AdminMenuPage.css';
import eduImage from '../assets/mmmonkey.jpg';
import userImage from '../assets/educational.jpg';
import wildlifeImage from '../assets/donations.jpg';
import donationImage from '../assets/donation.jpg';
import firebaseImage from '../assets/firebase.jpg';

const AdminMenuPage = () => {
  const { user, loading } = useUser(); // Access user and loading state from context
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Main Menu - Semonggoh Wildlife Centre";

    // Wait until loading is complete before checking user
    if (!loading && (!user || user.role_id !== 1)) {
      navigate('/'); // Redirect to homepage if not an admin
    }
  }, [navigate, user, loading]);

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while user data is being fetched
  }

  if (!user || user.role_id !== 1) {
    return null; // Prevent rendering the page if not authorized
  }

  return (
    <>
      <div className="hero-section" style={{ backgroundImage: `url(${eduImage})` }}>
        <div className="hero-text-container">
          <h1 className="hero-title">Welcome to the Admin Menu</h1>
          <p className="hero-description">Manage wildlife conservation efforts effectively.</p>
        </div>
      </div>

      <div className="admin-menu-container">
        <h1 className="admin-menu-title">Admin Main Menu</h1>
        <div className="admin-menu-categories">
          <Link to="/manage-users" className="admin-menu-item">
            <img src={userImage} alt="Manage Users" className="admin-menu-image" />
            <h2>Manage User Table</h2>
            <p>View, edit, or delete user accounts.</p>
          </Link>
          <Link to="/wildlife-table" className="admin-menu-item">
            <img src={wildlifeImage} alt="Manage Wildlife Records" className="admin-menu-image" />
            <h2>Manage Wildlife Records</h2>
            <p>Add or update wildlife records in the database.</p>
          </Link>
          <Link to="/donation-table" className="admin-menu-item">
            <img src={donationImage} alt="Donation Table" className="admin-menu-image" />
            <h2>Donation Table</h2>
            <p>View and manage donation records.</p>
          </Link>
          <Link to="/firebase" className="admin-menu-item">
            <img src={firebaseImage} alt="Firebase" className="admin-menu-image" />
            <h2>Firebase Table</h2>
            <p>Get real time data from the sensor.</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminMenuPage;
