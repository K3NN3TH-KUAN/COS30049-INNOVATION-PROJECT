import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    fetchUserRole(); // Fetch user role when the user logs in
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false); // Reset admin status on logout
  };

  const fetchUserRole = async () => {
    try {
      const response = await fetch("/prototype04/project-oo2/src/backend/userRole.php", { credentials: "include" });
      const data = await response.json();
      if (data.isAdmin) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error("Failed to fetch user role:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserRole();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
