import axios from "axios";
import React, { useEffect, useState } from "react";

const CompanyProfile = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setCompanyData(data);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  useEffect(() => {
    if (companyData) {
      // Load the Google Charts library
      const loadGoogleCharts = () => {
        const script = document.createElement('script');
        script.src = "https://www.gstatic.com/charts/loader.js";
        script.onload = () => {
          window.google.charts.load('current', { packages: ['corechart'] });
          window.google.charts.setOnLoadCallback(drawChart);
        };
        document.body.appendChild(script);
      };

      const drawChart = () => {
        const data = window.google.visualization.arrayToDataTable([
          ['Applicant', 'Mhl'],
          ['PROCESS', 2],
          ['HIRED', 5],
          ['REJECTED', 3],
        ]);

        const options = {
          title: 'Total Application 10',
          is3D: true,
        };

        const chart = new window.google.visualization.PieChart(document.getElementById('myChart'));
        chart.draw(data, options);
      };

      loadGoogleCharts();
    }
  }, [companyData]); // Only run when companyData is available

  if (loading) return <p>Loading...</p>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="CompanyProfile">
      <div className="First">
        <div className="Company-Detail">
          {companyData ? (
            <div>
              <img className="w-20 h-20 rounded-full" src={`http://localhost:5000/${companyData.companyLogo}`} alt="Company Logo" />
              <p>Your Position: {companyData.position}</p>
              <p>Email: {companyData.email}</p>
              <h1>Company Name: {companyData.companyName}</h1>
              <p>Type: {companyData.companyType}</p>
              <p>Business Model: {companyData.businessmodel}</p>
            </div>
          ) : (
            <p>No company data found</p>
          )}
        </div>
        <div className="job-detail">

        </div>
        
    
        

   
      </div>
      <div className="Second">
      <div className="calender">
        <iframe
        src={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(companyData.email)}&ctz=Asia%2FKolkata`}
        
      ></iframe>
      </div>

        
        
      </div>
    </div>
  );
};

export default CompanyProfile;
