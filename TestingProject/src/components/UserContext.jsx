import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a Context for the user
const UserContext = createContext();

// Custom hook for using user context
export const useUser = () => {
  return useContext(UserContext);
};

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  // Load user data from AsyncStorage when the component mounts
  React.useEffect(() => {
    loadUser();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      // Send request to backend to handle server-side logout
      const response = await fetch("http://192.168.0.158/MobileApp/TestingProject/src/backend/logout.php", {
        method: "POST", // Use POST to avoid caching issues
        credentials: "include", // Include cookies with the request
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Server confirmed successful logout, so clear client data
        setUser(null); // Clear the user state
        await AsyncStorage.removeItem("user"); // Remove user data from AsyncStorage
      } else {
        console.error("Logout failed:", data.error);
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
