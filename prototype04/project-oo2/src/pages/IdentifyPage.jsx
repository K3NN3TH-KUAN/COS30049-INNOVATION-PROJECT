import React, { useState } from 'react';
import eduImage from '../assets/identify.jpg';
import './IdentifyPage.css';

const IdentifyPage = () => {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [isPredictionVisible, setIsPredictionVisible] = useState(false); // State to toggle visibility

  // URLs for model and metadata (now from public folder)
  const modelURL = '/src/tm-my-image-model/model.json';
  const metadataURL = '/src/tm-my-image-model/metadata.json';

  // Load the model when the component mounts
  React.useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await window.tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();
  }, []);

  // Handle image upload and set image state
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => setImage(img);
    }
  };

  // Perform prediction when the button is clicked
  const handlePredict = async () => {
    if (model && image) {
      setIsLoading(true); // Set loading state to true
      try {
        const prediction = await model.predict(image);
        setPredictions(prediction);
        setIsPredictionVisible(true); // Make predictions visible after prediction is done
      } catch (error) {
        console.error('Error making prediction:', error);
      }
      setIsLoading(false); // Set loading state to false after prediction

      // Scroll to the prediction section after predictions are made
      const predictionSection = document.getElementById('prediction-section');
      if (predictionSection) {
        predictionSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Find the highest confidence prediction
  const highestConfidence = predictions.length > 0 ? predictions.reduce((max, pred) => (pred.probability > max.probability ? pred : max)) : null;

  return (
    <div className="container1">
      <div className="hero-section" style={{ backgroundImage: `url(${eduImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '300px' }}>
        <div className="hero-text-container">
          <h1 className="hero-title">Identify Portal</h1>
          <p className="hero-description">Upload an image and let our AI identify the species for you! Just hit "Identify" and get instant results.</p>
        </div>
      </div>

      <div className="upload-section">
        <h1 className="heading_1">Identify Species</h1>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button className="button1" onClick={handlePredict}>Identify</button>

        {/* Preview Image */}
        {image && <img src={image.src} alt="Uploaded" className="uploaded-image" />}
      </div>

      <div id="prediction-section" className={`prediction-section ${isPredictionVisible ? '' : 'hidden'}`}>
        {isLoading ? (
          <div className="loading-spinner">Processing...</div> // Display loading state
        ) : (
          <>
            {predictions.length > 0 && <h2 className="prediction-heading">Prediction Results:</h2>} {/* Add an h2 header for results */}
            {predictions.length > 0 ? (
              predictions.map((pred, index) => (
                <div
                  key={index}
                  className={`prediction-item ${pred === highestConfidence ? 'highlight' : ''}`}
                >
                  <div>{pred.className}</div>
                  <div>{(pred.probability * 100).toFixed(2)}%</div>
                </div>
              ))
            ) : (
              <p>No predictions yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default IdentifyPage;
