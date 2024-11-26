import React, { useEffect, useState, useRef } from 'react';
import './UserTable.css';
import eduImage from '../assets/educational.jpg';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

const UserTable = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '', role_id: '', pass: '' });
  const [loading, setLoading] = useState(true);
  const formRef = useRef(null);

  useEffect(() => {
    document.title = "Manage Users - Admin Dashboard";

    // Restrict access to authorized users
    if (!loading && (!user || user.role_id !== 1)) {
      navigate('/'); // Redirect unauthorized users to homepage
      return;
    }

    // Fetch users only if the user is an admin
    if (user && user.role_id === 1) {
      fetchUsers();
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/prototype04/project-oo2/src/backend/userTable.php?timestamp=' + new Date().getTime());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
      setSuccessMessage(null);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Could not fetch user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateUser = async (e) => {
    e.preventDefault();
    const action = editingUser ? 'update' : 'add';

    // Password validation
    if (formData.pass && formData.pass.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
      return;
    }

    const method = editingUser ? 'PUT' : 'POST';
    const endpoint = editingUser ? `/prototype04/project-oo2/src/backend/updateUser.php` : `/prototype04/project-oo2/src/backend/addUser.php`;

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, id: editingUser?.id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSuccessMessage(editingUser ? 'User updated successfully!' : 'User added successfully!');
      fetchUsers();
      setFormData({ username: '', email: '', role_id: '', pass: '' });
      setEditingUser(null);
    } catch (error) {
      console.error('Error adding/updating user:', error);
      setError('Could not save user data. Please try again later.');
    }
  };

  const handleEditUser = (user) => {
    if (!window.confirm('Are you sure you want to edit this user?')) {
      return;
    }
    setEditingUser(user);
    setFormData({ username: user.username, email: user.email, role_id: user.role_id, pass: '' });
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    if (!window.confirm('Are you sure you want to cancel editing? Any unsaved changes will be discarded.')) {
      return;
    }
    setEditingUser(null);
    setFormData({ username: '', email: '', role_id: '', pass: '' });
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/prototype04/project-oo2/src/backend/deleteUser.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSuccessMessage('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Could not delete user. Please try again later.');
    }
  };

  return (
    <>
      <div className="hero-section" style={{ backgroundImage: `url(${eduImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-text-container">
          <h1 className="hero-title">Manage User List</h1>
          <p className="hero-description">View, edit, and manage user information for smooth operation.</p>
        </div>
      </div>

      <div className="manage-users-container">
        <h2>Manage Users</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleAddOrUpdateUser} ref={formRef} className="user-form">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Role"
            value={formData.role_id}
            onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.pass}
            onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
            required
          />
          <button type="submit" className="submit-button">{editingUser ? 'Update User' : 'Add User'}</button>
          {editingUser && <button type="button" onClick={handleCancelEdit} className="cancel-button">Cancel</button>}
        </form>

        <div className="user-table-container">
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role_id}</td>
                      <td>
                        <button className="edit-button" onClick={() => handleEditUser(user)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default UserTable;
