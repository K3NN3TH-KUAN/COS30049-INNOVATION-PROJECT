import React, { useEffect } from "react"; // Importing useEffect
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import ImageSlider from '../components/ImageSlider';
import { useUser } from '../components/UserContext';
import './HomePage.css'; // Importing the CSS for text formatting

const HomePage = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { user } = useUser();

  useEffect(() => {
    document.title = "Home - Semonggoh Wildlife Centre";
  }, []); // Adding the useEffect to set the document title

  const handleRegisterClick = () => {
    if (user) {
      // If the user is logged in, redirect based on their role
      if (user.role_id === 1) {
        navigate('/admin'); // Redirect to admin main menu for admins
      } else {
        navigate('/main-menu'); // Redirect to main menu for regular users
      }
    } else {
      // If the user is not logged in, navigate to the register page
      navigate('/register');
    }
  };

  return (
    <div className="home-container">
      <ImageSlider />
      <div className="home-content">
        <h1>Welcome to the Home Page of SWC!</h1>
        <p>Our mission is to protect and preserve biodiversity while raising awareness about the importance of wildlife conservation.</p>
        <p>Explore our ongoing projects, discover ways to get involved, and learn how you can contribute to a sustainable future for wildlife. Together, we can make a meaningful impact and ensure a brighter future for generations to come.</p>
        <hr className="content-divider" />
        
        {/* Tableau Dashboard Embed */}
        <div className="tableau-embed-container">
          <h2>Explore Our Dashboard</h2>
          <iframe
            src="https://public.tableau.com/views/SemonggohDashboardVer2/Dashboard1?:embed=y&:display_count=y&:showVizHome=no"
            width="100%"
            height="600"
            frameBorder="0"
            title="Semonggoh Dashboard"
          ></iframe>
        </div>

        {/* Fun Facts Section */}
        <div className="fun-facts">
          <h2>Did You Know?</h2>
          <p>Over 1 million species are threatened with extinction.</p>
          <p>Conservation efforts can help protect our planet.</p>
          <p>Every small action counts in preserving wildlife!</p>

          <Link to="/info" className="cta-button">Discover More</Link>
        </div>

        {/* Interactive Element */}
        <div className="interactive-element">
          <h2>Join Us!</h2>
          <p>Sign up to stay updated on wildlife conservation efforts and explore extra features.</p>
          <button onClick={handleRegisterClick} className="cta-button">Register</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
