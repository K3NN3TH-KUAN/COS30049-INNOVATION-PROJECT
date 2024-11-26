import React, { useEffect, useState } from 'react';
import { database } from '../components/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import './Firebase.css';
import eduImage from '../assets/donations.jpg';

const FirebasePage = () => {
  const [sensorData, setSensorData] = useState([]);
  const [filteredSensorData, setFilteredSensorData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [rowLimit, setRowLimit] = useState(5); // State to control rows per page
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const { user } = useUser();
  const navigate = useNavigate();

  // Modal and Icon State
  const [modalVisible, setModalVisible] = useState(false);
  const [iconColor, setIconColor] = useState("#007bff");
  const [showMessageBox, setShowMessageBox] = useState(true);

  useEffect(() => {
    document.title = "Firebase - Admin Dashboard";

    if (!user || user.role_id !== 1) {
      navigate('/');
      return;
    }

    const dataRef = ref(database, 'sensorData/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.entries(data).map(([key, value]) => {
          const postData = {
            sensor_id: key,
            value: value
          };

          fetch('/prototype04/project-oo2/src/backend/updateSensorData.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
          })
          .then(response => response.json())
          .catch(err => console.error("Error updating sensor data:", err));

          return { key, value };
        });

        setSensorData(formattedData);
      }
    });

    fetchFilteredSensorData();
    return () => unsubscribe();
  }, [navigate, user]);

  const fetchFilteredSensorData = async () => {
    try {
      const response = await fetch('/prototype04/project-oo2/src/backend/getFilteredSensorData.php');
      if (!response.ok) throw new Error('Failed to fetch filtered data');
      const data = await response.json();
      setFilteredSensorData(data);
    } catch (error) {
      console.error("Error fetching filtered sensor data:", error);
    }
  };

  // Apply both the search term and row limit
  const filterAndDisplayData = () => {
    const filtered = filteredSensorData.filter(({ created_at }) =>
      new Date(created_at).toLocaleString().includes(searchTerm)
    );

    const limitedData = rowLimit === 'All' ? filtered : filtered.slice(0, rowLimit);
    setDisplayedData(limitedData);
  };

  // Trigger filter and display whenever the search term or row limit changes
  useEffect(() => {
    filterAndDisplayData();
  }, [filteredSensorData, rowLimit, searchTerm]);

  const handleIconPress = () => {
    setModalVisible(true);
    setIconColor("#FF6347");
    setShowMessageBox(false);
  };

  const handleIconRelease = () => {
    setIconColor("#007bff");
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleRowLimitChange = (e) => {
    const value = e.target.value === 'All' ? 'All' : Number(e.target.value);
    setRowLimit(value); // Set the row limit based on the selected option
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section" style={{ backgroundImage: `url(${eduImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '300px' }}>
        <div className="hero-text-container">
          <h1 className="hero-title">Real-Time Database</h1>
          <p className="hero-description">View the real-time data retrieved from the sensors placed in the sites.</p>
        </div>
      </div>

      <div className="firebase-page">
        {/* Header with Icon */}
        <div className="header-container">
          <h2 className="title-with-icon">
            Real-Time Sensor Data
            <button onClick={handleIconPress} onMouseUp={handleIconRelease} style={{ color: iconColor, marginLeft: '10px' }}>
              ?
            </button>
          </h2>
        </div>

        {/* Table for Sensor Data */}
        <table className="sensor-data-table">
          <thead>
            <tr>
              <th>Sensor ID</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map(({ key, value }) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Filtered Sensor Data (redLedStatus = 'ON') */}
        <h2 className="centered-title">Filtered Sensor Data (redLedStatus = 'ON')</h2>

        {/* Search and Row Limit Controls */}
        <div className="controls">
          <label className="search-label">
            Search by Date/Time: 
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter part of date/time (e.g., 11)"
              className="search-input"
            />
          </label>
          <label className="row-limit-label">
            Rows per page:
            <select value={rowLimit} onChange={handleRowLimitChange} className="row-limit-select">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value="All">All</option>
            </select>
          </label>
        </div>

        {/* Table for Filtered Sensor Data */}
        <table className="sensor-data-table">
          <thead>
            <tr>
              <th>Sensor ID</th>
              <th>Value</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map(({ sensor_id, value, created_at }, index) => (
              <tr key={index}>
                <td>{sensor_id}</td>
                <td>{value}</td>
                <td>{new Date(created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Message Box Above the Icon */}
        {showMessageBox && (
          <div className="message-box">
            <p className="message-text">Click for info</p>
          </div>
        )}

        {/* Modal with Information */}
        {modalVisible && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Sensor Information</h3>
              <p>Here are the details about the sensors used in this system:</p>
              
              <div className="sensor-card">
                <div className="sensor-info">
                  <span className="sensor-icon">🔊</span>
                  <h4>ObjectDetect (Ultrasonic Sensor)</h4>
                </div>
                <p>This sensor detects objects by ultrasonic sensor, used to detect an object.</p>
              </div>

              <div className="sensor-card">
                <div className="sensor-info">
                  <span className="sensor-icon">🖲️</span>
                  <h4>buttonPressed (Push Button)</h4>
                </div>
                <p>This button is used to detect if an object steps on it, which can trigger other actions.</p>
              </div>

              <div className="sensor-card">
                <div className="sensor-info">
                  <span className="sensor-icon">🔈</span>
                  <h4>soundValue (Sound Sensor)</h4>
                </div>
                <p>This sensor detects sound, such as a gunshot or other loud noises. If the sound exceeds 2000, it triggers a response.</p>
              </div>

              <div className="sensor-card">
                <div className="sensor-info">
                  <span className="sensor-icon">⚠️</span>
                  <h4>yellowLedStatus (Warning)</h4>
                </div>
                <p>The yellow light turns on when the ObjectDetect sensor detects an object (condition "YES").</p>
              </div>
              
              <div className="sensor-card">
                <div className="sensor-info">
                  <span className="sensor-icon">🚨</span>
                  <h4>redLedStatus (Alert)</h4>
                </div>
                <p>The red light is triggered when both the ObjectDetect and buttonPressed sensors are in the "YES" condition, or the sound value exceeds 2000.</p>
              </div>
              
              <button className="close-modal" onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirebasePage;
