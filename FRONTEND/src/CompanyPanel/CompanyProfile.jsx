
import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyProfile = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [application, setapplication] = useState([]);


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



    const fetchJobs = async () => {
      if (!companyData) return; // Ensure companyData is available
      try {
        const response = await axios.get("http://localhost:5000/api/jobs");
     const filteredJobs = response.data.filter(job => job.companyName === companyData.companyName && job.jobtoadmin === true );
    //  setJobs(filteredJobs);
    //  console.log("jobs",s",application);


     const jobsWithApplications = filteredJobs.map(job => {
      // Find applications that match the current job ID
      const applicationList = application.filter(app => app.jobId._id === job._id);
      // console.log();
      
      // Add the application list to the job object
      return {
          ...job,
          applicationList: applicationList // Append matching applications
      };
  });
  // console.log("jobs with application lists", jobsWithApplications);
// console.log("application", application);
setJobs(jobsWithApplications);
// console.log(jobs);





      } catch (error) {
        console.error("There was an error fetching the jobs!", error);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/applications`);
        const fetchedApplications = response.data.filter(app => app.status === 'Accepted');
        setapplication(fetchedApplications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    

useEffect(() => {
      fetchCompanyData();
      fetchApplications();
  }, []);
  useEffect(() => {
    fetchJobs(); // Fetch jobs only when companyData changes
  }, [companyData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <div>Error: {error}</div>;

  const totalApplications = jobs.reduce((total, job) => total + job.applicationList.length, 0);
  const underProcess = jobs.reduce((total, job) => total + job.applicationList.filter(app => app.statusByCompany === 'Accepted').length,  0);
  const hired = jobs.reduce((total, job) => total + job.applicationList.filter(app => app.statusByCompany === 'Hired').length,  0);
  return (
    <> 

      <div id="CompanyProfile">
      <div className="first">
       
        <div className="first-div">
          {companyData ? (
            <div>
              <img className="w-20 h-20 rounded-full" src={`http://localhost:5000/${companyData.companyLogo}`} alt="CompanyLogo" />
              <p>Your Position: {companyData.position}</p>
              <p>Email: {companyData.email}</p>
     

            </div>
          ) : (
            <p>No company data found</p>
          )}
        </div>
        <div className="first-div">
          <h2>TOTAL</h2>
          <div className="detail">
            <span>{jobs.length < 10 ? `00${jobs.length}` : `${jobs.length}`}</span> <h2>POSTED JOB</h2>
          </div>
          <div className="detail">
            <span style={{ backgroundColor: 'white',color:'black' }}>{totalApplications < 10 ? `00${totalApplications}` : `${totalApplications}`}</span><h2>APLICANT</h2>
          </div>

        </div>

        <div className="first-div">
          <h2>APPLICANT</h2>
          <div className="detail">
            <span>{underProcess < 10 ? `00${underProcess}` : `${underProcess}`}</span> <h2>UNDER REVIEW</h2>
          </div>
          <div className="detail" >
            <span style={{ backgroundColor: 'white',color:'black'}}>{hired < 10 ? `00${hired}` : `${hired}`}</span><h2>HIRED</h2>
          </div>
        </div>
      </div>
      <div className="second">
        <h2>HIRING PIPELINE</h2>
        <table>
          <tr>
            <th style={{textAlign:'left'}}> <span >ROLE</span></th>
            <th>LOCATION</th>
            <th></th>
            <th>REQUIREMENT</th>
            <th>TOTAL</th>
            <th>Under PROCESS</th>
            <th>REJECTED</th>
            <th>HIRED</th>
          </tr>
          {jobs.map((job, index) => (
          <tr key={index}>
            <td style={{textAlign:'left'}}>{job.jobTitle}</td>
            <td>{job.location}</td>
            <td><span>&#9673;</span></td>
            <td>{job.noofposition}</td>
            <td>{job.applicationList.length}</td>
            <td>{(job.applicationList.filter(app => app.statusByCompany=== 'Accepted')).length}</td>
            <td>{(job.applicationList.filter(app => app.statusByCompany=== 'Rejected')).length}</td>

            <td>{(job.applicationList.filter(app => app.statusByCompany=== 'Hired')).length}</td>
          </tr>
        ))}
          
          
        </table>
      </div>
      <div className="third">

      
      <iframe
        src={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(companyData.email)}&ctz=Asia%2FKolkata`}
        
      ></iframe> 

</div>

    </div>

    </>

  );
};



export default CompanyProfile;

 
