// TitleUpdater.jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const pageTitles = {
      '/': 'Home - DC',
      '/StudentProfileView': 'Student Profile',
      '/Profile': 'Profile',
      // Add more routes and titles as needed
    };

    // Default title if route not found in pageTitles object
    document.title = pageTitles[location.pathname] || 'DC';
  }, [location.pathname]);

  return null; // This component does not render anything
};

export default TitleUpdater;
