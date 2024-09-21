import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
// import Auth from './Auth'; // Import AuthContext

const Protected = ({ children }) => {
  const { isAuthenticated } = useContext(Auth); // Use authentication from AuthContext

  if (!isAuthenticated) {
    // If not authenticated, redirect to HR login page
    return <Navigate to="/HrLogin" />;
  }

  // If authenticated, render the protected component
  return children;
};

export default Protected;