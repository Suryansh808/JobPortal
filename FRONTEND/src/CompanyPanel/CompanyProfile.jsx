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

  const students = [
    { name: 'John Doe', status: 'Hired', position: 'Software Engineer', date: '2024-09-01' },
    { name: 'Jane Smith', status: 'Rejected', position: 'Marketing Intern', date: '2024-09-05' },
    { name: 'Alex Brown', status: 'Pending', position: 'Data Analyst', date: '2024-09-10' },
  ];

  const overview = {
    totalApplied: students.length,
    totalHired: students.filter(s => s.status === 'Hired').length,
    totalRejected: students.filter(s => s.status === 'Rejected').length,
    totalPending: students.filter(s => s.status === 'Pending').length,
  };


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

<div className="bg-white shadow-md text-black rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold">Total Applied</h3>
            <p>{overview.totalApplied}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold">Total Hired</h3>
            <p>{overview.totalHired}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="font-semibold">Total Rejected</h3>
            <p>{overview.totalRejected}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="font-semibold">Total Pending</h3>
            <p>{overview.totalPending}</p>
          </div>
        </div>
      </div>
     <table className="min-w-full bg-white border text-black border-gray-200">
      
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Student Name</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Position Applied For</th>
            <th className="py-2 px-4 border">Date of Application</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{student.name}</td>
              <td className="py-2 px-4 border">{student.status}</td>
              <td className="py-2 px-4 border">{student.position}</td>
              <td className="py-2 px-4 border">{student.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyProfile;
