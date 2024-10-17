import React, { useState, useEffect } from "react";
import axios from "axios";


const AdminProfile = () => {
  const [jobs, setJobs] = useState([]);
  const [application, setapplication] = useState([]);
  const [hrmanager, sethrManager] = useState([]);
  const [company, setcompany] = useState([]);
  const [student, setstudent] = useState([]);


  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/jobs");
      const TotalJobs = response.data.filter(job => job.jobtoadmin === true);
      setJobs(TotalJobs);
      //  console.log(TotalJobs);
    } catch (error) {
      console.error("There was an error fetching the jobs!", error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/applications`);
      const fetchedApplications = response.data;
      setapplication(fetchedApplications);
      // console.log(fetchedApplications);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const hiringPartner = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/companydata`);
      const fetchcompany = response.data;
      setcompany(fetchcompany);
      console.log(fetchcompany);

    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };
  const candidate = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/usersdata`);
      const userdata= response.data;
      setstudent(userdata);
      console.log("danish",student);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };
  const hrManager = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/hr`);
      const allHr = response.data;
      sethrManager(allHr);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };


  useEffect(() => {
    fetchApplications();
    fetchJobs();
    hiringPartner();
    candidate();
    hrManager();


  }, []);

  return (
    <div id="AdminProfile">
      <div className="first">
        <div className="first-div">
          <h2>TOTAL</h2>
          <div className="detail">
            <span>{jobs.length}</span> <h2>POSTED JOB</h2>
          </div>
          <div className="detail">
            <span style={{ backgroundColor: 'white', color: 'black' }}>{application.length}</span><h2>APPLICANT</h2>
          </div>

        </div>
        <div className="first-div">
          <h2>JOB</h2>
          <div className="detail">
            <span>{(jobs.filter(app => app.admintohr === true)).length}</span> <h2>ASSIGN to HR</h2>
          </div>
          <div className="detail">
            <span style={{ backgroundColor: 'white', color: 'black' }}>{(jobs.filter(app => app.admintohr === false)).length}</span><h2>PENDING / NOT ASSIGN</h2>
          </div>

        </div>

        <div className="first-div">
          <h2>APPLICANT</h2>
          <div className="detail">
            <span>{(application.filter(app => app.status === "Accepted" && app.statusByCompany != "Hired" && app.statusByCompany != "Rejected")).length}</span> <h2>UNDER REVIEW</h2>
          </div>
          <div className="detail" >
            <span style={{ backgroundColor: 'white', color: 'black' }}>{(application.filter(app => app.statusByCompany === "Hired")).length}</span><h2>HIRED</h2>
          </div>
        </div>
      </div>
      <div className="second">

        <div class="card">
          <div class="card-inner">
            <div class="card-front">

              <p>HIRING PARTNER <br />{company.length} </p>

            </div>
            <div class="card-back">
              <table>
                <tr>
                  <th>Sl No</th>
                  <th>Company Name</th>
                  <th>Company Email</th>
        
                  <th>Posted Jobs</th>
          
                </tr>

                {company.map((comp, index) => (

                  <tr>
                    <td >{index + 1}  </td>
                    <td> {comp.companyName}</td>
                    <td>{comp.email}</td>
                   
                    <td>{(jobs.filter(job => job.companyName === comp.companyName)).length}</td>

                  </tr>
                ))}




              </table>




            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-inner">
            <div class="card-front">
              <p>TOTAL USER <br /> {student.length}</p>
            </div>
            <div class="card-back">
              <table>
                <tr>
                  <th>Sl No</th>
                  <th>Name</th>
                  <th>Applied Job</th>
                

                </tr>
                {student.map((std, index) => (

<tr>
  <td >{index + 1}  </td>
  <td> {std.fullname}</td>
  <td>{(application.filter(app => app.userId._id == std._id)).length}</td>
  {/* <td>{std._id}</td> */}
 
</tr>
))}

              </table>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-inner">
            <div class="card-front">
              <p>HR MANAGER  <br /> {hrmanager.length}</p>

            </div>
            <div class="card-back">
              <table>
                <tr>
                  <th>Sl No</th>
                  <th>Name</th>
                  <th>Job Assign</th>
                  <th>Handle Applicant</th>
                </tr>
                {hrmanager.map((hr, index) => (

                  <tr>
                    <td >{index + 1}  </td>
                    <td> {hr.hrName}</td>
                    <td>{(jobs.filter(job => job.hrName === hr.hrName)).length}</td>
                    <td>{(application.filter(app => app.hrName === hr.hrName)).length}</td>
                  </tr>
                ))}




              </table>

            </div>
          </div>
        </div>

      </div>
      <div className="third">
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=UTC&bgcolor=%23ffffff&src=YWZmYW5qb2IzMDAzQGdtYWlsLmNvbQ&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043"

        ></iframe>

      </div>


    </div>
  );
};
export default AdminProfile;
