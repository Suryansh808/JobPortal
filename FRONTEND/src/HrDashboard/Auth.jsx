import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// Create the AuthContext
const Auth = createContext();

export const HRAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check for HR authentication status
  useEffect(() => {
    const hrName = localStorage.getItem('HrName');
    if (hrName) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Function to handle HR login
  const login = (hrName) => {
    localStorage.setItem('HrName', hrName);
    setIsAuthenticated(true);
    navigate('/Protected'); // Redirect to protected route after login
  };

  // Function to handle HR logout
  const logout = () => {
    localStorage.removeItem('HrName');
    setIsAuthenticated(false);
    navigate('/HrLogin'); // Redirect to HR login after logout
  };

  return (
    <HRAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </HRAuthContext.Provider>
  );
};

export default Auth;
