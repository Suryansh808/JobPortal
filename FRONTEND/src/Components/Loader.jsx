// src/components/Loader.jsx
import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <div className="intern"></div>
      <div className="external-shadow">
        <div className="central"></div>
      </div>
    </div>
  );
};

export default Loader;
