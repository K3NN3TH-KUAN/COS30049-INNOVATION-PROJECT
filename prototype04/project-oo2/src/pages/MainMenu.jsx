import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';
import donationImage from '../assets/donation.jpg'; // Update the path as needed
import educationalImage from '../assets/educational.jpg';
import identifyImage from '../assets/identify.jpg';
import eduImage from '../assets/mmmonkey.jpg'; 
import infoImage from '../assets/info.jpg';

const MainMenu = () => {
  useEffect(() => {
    document.title = "Main Menu - Semonggoh Wildlife Centre";
  }, []);

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    switch (category) {
      case 'donation':
        navigate('/donate');
        break;
      case 'educational':
        navigate('/edu');
        break;
      case 'identify':
        navigate('/identify');
        break;
      case 'info':
      navigate('/info');
      break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Banner Section */}
      <div className="hero-section" style={{ backgroundImage: `url(${eduImage})` }}>
        <div className="hero-text-container">
          <h1 className="hero-title">Explore to Wildlife Conservation</h1>
          <p className="hero-description">Explore our educational resources, support conservation efforts through donations, and learn to identify various species. Your involvement matters!</p>
        </div>
      </div>

      {/* Main Menu Section */}
      <div className="main-menu">
        <h2>Main Menu</h2>
        
        <div className="menu-category" onClick={() => handleCategoryClick('donation')}>
          <img src={donationImage} alt="Donation" className="category-image" />
          <div className="category-text">
            <h3>Donation</h3>
            <p>Support our cause through donations.</p>
          </div>
        </div>
        
        <div className="menu-category" onClick={() => handleCategoryClick('educational')}>
          <img src={educationalImage} alt="Educational" className="category-image" />
          <div className="category-text">
            <h3>Educational</h3>
            <p>Learn more about our educational programs.</p>
          </div>
        </div>

        <div className="menu-category" onClick={() => handleCategoryClick('info')}>
          <img src={infoImage} alt="Information" className="category-image" />
          <div className="category-text">
            <h3>Information</h3>
            <p>Discover wildlife information</p>
          </div>
        </div>
        
        <div className="menu-category" onClick={() => handleCategoryClick('identify')}>
          <img src={identifyImage} alt="Identify" className="category-image" />
          <div className="category-text">
            <h3>Identify</h3>
            <p>Identify different wildlife species.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainMenu;
