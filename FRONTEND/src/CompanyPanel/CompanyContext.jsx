// CompanyContext.js
import React, { createContext, useState, useContext } from 'react';

const CompanyContext = createContext();

export const useCompany = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {

  const [companyId, setCompanyId] = useState("");

  return (
    <CompanyContext.Provider value={{ companyId, setCompanyId }}>
      {children}
    </CompanyContext.Provider>
  );
};


