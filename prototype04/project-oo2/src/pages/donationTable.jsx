import React, { useEffect, useState } from 'react';
import './donationTable.css';
import donationImage from '../assets/donation.jpg';

const DonationTable = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(5);

  useEffect(() => {
    document.title = "Donations - Admin Dashboard";
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await fetch(`/prototype04/project-oo2/src/backend/getDonations.php?timestamp=${new Date().getTime()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === 'success') {
        setDonations(data.data); // Accessing the donations through the 'data' property
      } else {
        throw new Error(data.message || "Failed to fetch donations.");
      }
    } catch (error) {
      console.error("Error fetching donation data:", error);
      setError("Could not load donations. Please try again later.");
    }
  };

  const handleDisplayLimitChange = (e) => {
    const limit = e.target.value === "All" ? donations.length : parseInt(e.target.value);
    setDisplayLimit(limit);
  };

  return (
    <div>
      <div className="hero-section" style={{ backgroundImage: `url(${donationImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-text-container">
          <h1 className="hero-title">Donation Records</h1>
          <p className="hero-description">View all contributions made by our generous supporters.
          These funds enable the ongoing efforts in wildlife conservation, habitat protection, and awareness programs at Semonggoh Wildlife Centre.</p>
        </div>
      </div>

      <div className="donation-table-container">
        <h2>Donations Record</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="filter-container">
          <label htmlFor="displayLimit">Show rows: </label>
          <select id="displayLimit" value={displayLimit} onChange={handleDisplayLimitChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="All">All</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table className="donation-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {donations.length > 0 ? (
                donations.slice(0, displayLimit).map((donation) => (
                  <tr key={donation.id}>
                    <td>{donation.id}</td>
                    <td>{donation.email}</td>
                    <td>${parseFloat(donation.amount).toFixed(2)}</td>
                    <td>{new Date(donation.donation_date).toLocaleDateString()}</td>
                    <td>{donation.message || 'No message'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No donations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonationTable;
