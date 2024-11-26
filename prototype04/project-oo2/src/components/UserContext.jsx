import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for the user
const UserContext = createContext();

// Custom hook for using user context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Load user data from local storage when the component mounts
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false); // Set loading to false after user is loaded
    };

    loadUser();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      const response = await fetch('/prototype04/project-oo2/src/backend/logout.php', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setUser(null);
        localStorage.removeItem('user');
      } else {
        console.error('Logout failed:', data.error);
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
