import React, { useState, useEffect } from "react";
import axios from "axios";

const HrProfile = () => {
  const [hrData, setHrData] = useState(null);
  const [error, setError] = useState(''); 
  const [showDiv, setShowDiv] = useState(false);


  const [jobs, setJobs] = useState([]);
  const [application, setapplication] = useState([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDiv(true);
    }, 2000); // 2000 milliseconds = 2 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);


    // Fetch HR data when component mounts
    const fetchHrData = async () => {
      // Retrieve HRUser ID from local storage
      const hrName = localStorage.getItem('HrName');
      if (!hrName) {
        setError('User not logged in');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/hr/profile/${hrName}`);
        const data = await response.json();
        if (response.ok) {
          setHrData(data[0]);
          console.log(hrData);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };


    const fetchJobs = async () => {
      // if (!hrData) return; // Ensure companyData is available
      try {
        const response = await axios.get("http://localhost:5000/api/jobs");
     const filteredJobs = response.data.filter(job => job.hrName === hrData.hrName );


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
//   console.log("jobs with application lists", jobsWithApplications);
// console.log("application", application);
setJobs(jobsWithApplications);
console.log(jobs);

      } catch (error) {
        console.error("There was an error fetching the jobs!", error);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/applications`);
        
        const fetchedApplications = response.data.filter(app => app.status === 'Accepted' && app.hrName === hrData.hrName );
        setapplication(fetchedApplications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };


  
useEffect(() => {
    fetchHrData();
    // fetchApplications();
  }, []);
  useEffect(() => {
    fetchApplications();

  }, [hrData]);


  useEffect(() => {

    fetchJobs();
  }, [application]);

  const totalApplications = jobs.reduce((total, job) => total + job.applicationList.length, 0);
  const underProcess = jobs.reduce((total, job) => total + job.applicationList.filter(app => app.statusByCompany === 'Accepted').length,  0);
  const hired = jobs.reduce((total, job) => total + job.applicationList.filter(app => app.statusByCompany === 'Hired').length,  0);



  return (


    <div id="CompanyProfile">
      <div className="first">
        <div className="first-div">
          {hrData ? (
            <div>
              <h2>WELCOME BACK</h2>
              <h2>{hrData.hrName}</h2>
          <h2>Email: {hrData.hrUserId}</h2>
             
            </div>
          ) : (
            <p>No HR data found</p>
          )}
        </div>
        <div className="first-div">
          <h2>TOTAL</h2>
          <div className="detail">
            <span>{jobs.length < 10 ? `00${jobs.length}` : `${jobs.length}`}</span> <h2>ASIGN JOB</h2>
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
            <th>PROCESS</th>
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
      {showDiv &&
      <div className="third">

      
      <iframe
        src={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(hrData.hrUserId)}&ctz=Asia%2FKolkata`}
        
      ></iframe> 

</div>}

    </div>

  );
};

export default HrProfile;
