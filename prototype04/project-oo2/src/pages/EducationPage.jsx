// src/pages/EducationPage.jsx
import React, { useEffect } from "react"; // Importing useEffect
import eduImage from '../assets/educational.jpg'; 
import habImage from '../assets/habitat.jpg';
import './EducationPage.css'; // Importing the CSS for styling

const EducationPage = () => {
  useEffect(() => {
    document.title = "Education - Semonggoh Wildlife Centre";
  }, []); // Adding the useEffect to set the document title

  return (
    <div className="education-page">
      <div className="hero-section" style={{ backgroundImage: `url(${eduImage})` }}>
        <div className="hero-text-container">
          <h1 className="hero-title">Welcome to the Education Page</h1>
          <p className="hero-description">Learn about the importance of wildlife conservation and how you can make a difference.</p>
        </div>
      </div>

      <div className="content-section">
        <h2>
          Preserving wildlife is crucial for maintaining biodiversity and ecological balance.
        </h2>
        <p className="intro-text">
          Here are some basic strategies to help protect wildlife:
        </p>
        
        <ol className="strategies-list">
          <li>
            <b>Habitat Conservation</b>: Protecting and restoring natural habitats like forests, wetlands, and grasslands is essential. This can involve creating protected areas, reforestation, and wetland restoration.
          </li>
          <li>
            <b>Sustainable Land-Use Practices</b>: Implementing sustainable agricultural and forestry practices helps reduce habitat destruction and fragmentation. This includes reducing pesticide use and promoting eco-friendly technologies.
          </li>
          <li>
            <b>Research and Monitoring</b>: Conducting research and monitoring wildlife populations helps identify conservation needs and inform policy decisions. This includes tracking changes in habitat quality and population sizes.
          </li>
          <li>
            <b>Public Education and Awareness</b>: Educating the public about the importance of wildlife conservation can foster a culture of responsible behavior. Outreach programs and awareness campaigns can highlight the impacts of human activities on wildlife.
          </li>
        </ol>

        <div className="images-container">
          <img src={eduImage} alt="Wildlife Conservation" className="education-image" />
          <img src={habImage} alt="Wildlife Habitat" className="education-image" />
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
