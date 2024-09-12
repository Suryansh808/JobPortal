import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming you are using axios for HTTP requests

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token on client side
      if (isTokenValid(token)) {
        // Optionally, validate token with the server
        axios.get('http://localhost:5000/api/checkAuth', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(response => {
            if (response.status === 200) {
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
              handleLogout();
            }
          })
          .catch(err => {
            console.error('Authentication check failed:', err);
            setIsAuthenticated(false);
            handleLogout();
          });
        }
    } 
  }, []);

  const isTokenValid = (token) => {
    // Token validation logic, e.g., checking expiration
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decoded.exp > currentTime; // Check if token is expired
    } catch (e) {
      console.error('Invalid token format:', e);
      return false;
    }
  };



  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    navigate('/CompanyDashBoard'); // Redirect to dashboard after login
  };

  const logout = () => {
    handleLogout();
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('companyName');
    setIsAuthenticated(false);
    navigate('/CompanyLogInPage');
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

