import React, { useEffect, useState, useRef } from 'react';
import './wildlifeTable.css';
import bannerImage from '../assets/donations.jpg';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

const WildlifeTable = () => {
  const [wildlifeData, setWildlifeData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWildlife, setSelectedWildlife] = useState(null); // For editing
  const [isEditMode, setIsEditMode] = useState(false); // Track if editing mode is on
  const [formData, setFormData] = useState({
    species_name: '',
    common_name: '',
    scientific_name: '',
    population_estimate: '',
    status: '',
    last_seen: ''
  });

  const formRef = useRef(null); // Reference to the form
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Wildlife Management - Admin Dashboard";

    // Restrict access to authorized users
    if (!loading && (!user || user.role_id !== 1)) {
      navigate('/'); // Redirect unauthorized users to homepage
    }

    fetchWildlifeData();
  }, [navigate, user]);

  const fetchWildlifeData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/prototype04/project-oo2/src/backend/getWildlife.php?timestamp=' + new Date().getTime());
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setWildlifeData(data);
    } catch (error) {
      console.error("Error fetching wildlife data:", error);
      setError("Could not load wildlife data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = async () => {
    const confirmAdd = window.confirm("Are you sure you want to add this record?");
    if (!confirmAdd) return;

    try {
      const response = await fetch('/prototype04/project-oo2/src/backend/addWildlife.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("Record added successfully!");
        fetchWildlifeData();
        setFormData({ species_name: '', common_name: '', scientific_name: '', population_estimate: '', status: '', last_seen: ''});
      }
    } catch (error) {
      console.error("Error adding wildlife record:", error);
    }
  };

  const handleEdit = (wildlife) => {
    const confirmEdit = window.confirm("Are you sure you want to edit this record?");
    if (!confirmEdit) return;

    setSelectedWildlife(wildlife);
    setFormData(wildlife);
    setIsEditMode(true);
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveEdit = async () => {
    const confirmSave = window.confirm("Are you sure you want to save the changes?");
    if (!confirmSave) return;

    try {
      const response = await fetch('/prototype04/project-oo2/src/backend/editWildlife.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedWildlife.id, ...formData })
      });
      if (response.ok) {
        alert("Record updated successfully!");
        fetchWildlifeData();
        handleCancelEdit(); // Reset form after saving
      }
    } catch (error) {
      console.error("Error updating wildlife record:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;

    try {
      const response = await fetch('/prototype04/project-oo2/src/backend/deleteWildlife.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (response.ok) {
        alert("Record deleted successfully!");
        fetchWildlifeData();
      }
    } catch (error) {
      console.error("Error deleting wildlife record:", error);
    }
  };

  const handleCancelEdit = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel editing?");
    if (!confirmCancel) return;

    setIsEditMode(false);
    setSelectedWildlife(null);
    setFormData({ species_name: '', common_name: '', scientific_name: '', population_estimate: '', status: '', last_seen: '' });
  };

  return (
    <>
      <div className="hero-section" style={{ backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-text-container">
          <h1 className="hero-title">Wildlife Data Management</h1>
          <p className="hero-description">Monitor and manage wildlife data for conservation efforts.</p>
        </div>
      </div>

      <div className="wildlife-table-container">
        <h2>Wildlife Records</h2>
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <>
            <div ref={formRef} className="form-section add-wildlife-form">
              <h3>{isEditMode ? "Edit Wildlife Record" : "Add New Wildlife Record"}</h3>
              <form onSubmit={(e) => { e.preventDefault(); isEditMode ? handleSaveEdit() : handleAdd(); }}>
                <div className="form-group">
                  <input name="species_name" placeholder="Species Name" value={formData.species_name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <input name="common_name" placeholder="Common Name" value={formData.common_name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <input name="scientific_name" placeholder="Scientific Name" value={formData.scientific_name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <input name="population_estimate" placeholder="Population Estimate" value={formData.population_estimate} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <input name="status" placeholder="Status" value={formData.status} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <input name="last_seen" type="date" value={formData.last_seen} onChange={handleInputChange} required />
                </div>
                <div className="form-buttons">
                  <button type="submit" className="submit-button">{isEditMode ? "Save Changes" : "Add Record"}</button>
                  {isEditMode && (
                    <button type="button" className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                  )}
                </div>
              </form>
            </div>

            <div className="table-wrapper">
              <table className="wildlife-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Species Name</th>
                    <th>Common Name</th>
                    <th>Scientific Name</th>
                    <th>Population Estimate</th>
                    <th>Status</th>
                    <th>Last Seen</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {wildlifeData.length > 0 ? (
                    wildlifeData.map((wildlife) => (
                      <tr key={wildlife.id}>
                        <td>{wildlife.id}</td>
                        <td>{wildlife.species_name}</td>
                        <td>{wildlife.common_name}</td>
                        <td>{wildlife.scientific_name}</td>
                        <td>{wildlife.population_estimate}</td>
                        <td>{wildlife.status}</td>
                        <td>{new Date(wildlife.last_seen).toLocaleDateString()}</td>
                        <td>
                          <button onClick={() => handleEdit(wildlife)} className="edit-button">Edit</button>
                          <button onClick={() => handleDelete(wildlife.id)} className="delete-button">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No wildlife records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WildlifeTable;
