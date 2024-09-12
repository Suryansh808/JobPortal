// ApplicationStatusContext.js
import React, { createContext, useState } from 'react';

export const ApplicationStatusContext = createContext();

export const ApplicationStatusProvider = ({ children }) => {
  const [applicationStatus, setApplicationStatus] = useState("");

  return (
    <ApplicationStatusContext.Provider value={{ applicationStatus, setApplicationStatus }}>
      {children}
    </ApplicationStatusContext.Provider>
  );
};
