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
      <div className="first">
        <div className="first-div">
          {companyData ? (
            <div>
              <img className="w-20 h-20 rounded-full" src={`http://localhost:5000/${companyData.companyLogo}`} alt="Company Logo" />
              <p>Your Position: {companyData.position}</p>
              <p>Email: {companyData.email}</p>
              <h1>Company Name: {companyData.companyName}</h1>

              {/* <p>Business Model: {companyData.businessmodel}</p> */}
            </div>
          ) : (
            <p>No company data found</p>
          )}
        </div>
        <div className="first-div">
          <h2>JOB</h2>
          <div className="detail">
            <span>005</span> <h2>TOTAL POSTED JOB</h2>
          </div>
          <div className="detail">
            <span style={{ backgroundColor: 'orange' }}>005</span><h2>ACTIVE JOB</h2>
          </div>

        </div>

        <div className="first-div">
          <h2>APPLICANT</h2>
          <div className="detail">
            <span>005</span> <h2>UNDER REVIEW</h2>
          </div>
          <div className="detail" >
            <span style={{ backgroundColor: 'orange' }}>005</span><h2>HIRED</h2>
          </div>
        </div>
      </div>
      <div className="second">
        <h2>HIRING PIPELINE</h2>
        <table>
          <tr>
            <th style={{textAlign:'left'}}> <span >ROLE</span></th>
            <th></th>
            <th>REQUIREMENT</th>
            <th>TOTAL</th>
            <th>PROCESS</th>
            <th>HIRED</th>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>Software Engineer</td>
            <td><span>&#9673;</span></td>
            <td>5</td>
            <td>100</td>
            <td>50</td>
            <td>3</td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>Software Engineer</td>
            <td><span>&#9673;</span></td>
            <td>5</td>
            <td>100</td>
            <td>50</td>
            <td>3</td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>Software Engineer</td>
            <td><span>&#9673;</span></td>
            <td>5</td>
            <td>100</td>
            <td>50</td>
            <td>3</td>
          </tr>
          <tr>
            <td style={{textAlign:'left'}}>Software Engineer</td>
            <td><span>&#9673;</span></td>
            <td>5</td>
            <td>100</td>
            <td>50</td>
            <td>3</td>
          </tr>
        </table>
      </div>
      <div className="third">

      
      <iframe
        src={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(companyData.email)}&ctz=Asia%2FKolkata`}
        
      ></iframe> 

</div>

    </div>
  );
};



export default CompanyProfile;

 
