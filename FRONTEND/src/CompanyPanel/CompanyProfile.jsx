import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom'; 
const CompanyProfile = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const { companyName } = useParams();

  useEffect(() => {
    const fetchCompanyData = async () => {
      const token = localStorage.getItem('token'); // Fetch token from local storage
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/api/company`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Send token in the Authorization header
          },
        });
        if (!response.ok) {
          throw new Error('Company not found');
        }
  
        const data = await response.json();
        console.log(data);
        setCompanyData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCompanyData();
  }, []);
  
  if (loading) {
    return <p>Loading...</p>;
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
     {companyData ? (
        <div>
          <img className="w-40 h-40 rounded-full" src={`http://localhost:5000/${companyData.companyLogo}`} alt="CompanyLogo" />
          <h1>Company Name: {companyData.companyName}</h1>
          <p>Type: {companyData.companyType}</p>
          <p>Position: {companyData.position}</p>
          <p>Business Model: {companyData.businessmodel}</p>
          <p>Email: {companyData.email}</p>
          <p>CompanyId: {companyData.companyId}</p>
        </div>
      ) : (
        <p>No company data found</p>
      )}
    </div>
  );
};

export default CompanyProfile;
