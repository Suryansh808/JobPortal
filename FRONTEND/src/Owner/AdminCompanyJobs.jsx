
import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import axios from "axios";

const AdminCompanyJobs = () => {
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    jobTiming: "",
    workingDays: "",
    salary: {
      minSalary: "",
      maxSalary: "",
      currency: "INR",
      per: "Year",
    },
    jobDescription: "",
    desiredSkills: "",
    experience: "",
    eligibility: "",
    companyLogo: "",
    applicationDeadline: "",
  });

  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // To track which job is being edited

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "minSalary" || name === "maxSalary") {
      setJobDetails((prevDetails) => ({
        ...prevDetails,
        salary: { ...prevDetails.salary, [name]: value },
      }));
    } else {
      setJobDetails({ ...jobDetails, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // Update the job if editing
      const updatedJobs = [...jobs];
      updatedJobs[editingIndex] = jobDetails;
      setJobs(updatedJobs);
    } else {
      // Add a new job
      setJobs([...jobs, jobDetails]);
    }

    setJobDetails({
      jobTitle: "",
      companyName: "",
      location: "",
      jobType: "",
      jobTiming: "",
      workingDays: "",
      salary: {
        minSalary: "",
        maxSalary: "",
        currency: "INR",
        per: "Year",
      },
      jobDescription: "",
      desiredSkills: "",
      experience: "",
      eligibility: "",
      companyLogo: "",
      applicationDeadline: "",
    });

    setEditingIndex(null);
    setOpen(false);
    console.log("Job Posted:", jobDetails);
  };

  const [hrs, setHrs] = useState([]);
 // const [hrMap, setHrMap] = useState(new Map()); // State to hold HR data map
  const fetchHrs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/hr');
      const data = await response.json();
      setHrs(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchHrs(); // Fetch the list of HRs when the component mounts
  }, []);



  const [companyjobs, setCompanyJobs] = useState([]);
  const [message, setMessage] = useState('');

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
      const data = await response.json();
      if (response.ok) {
       //setCompanyJobs(data);
       console.log(data);
        setCompanyJobs(data.filter(job => job.admintohr === false));
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchJobs(); // Fetch jobs when the component mounts
  }, []);


const [selectedHRId, setSelectedHRId] = useState(""); // To store selected HR ID

const handleHRChange = (event) => {
  setSelectedHRId(event.target.value);
};

const handleAsignHr = async (jobId) => {
  try {
    // Find the selected HR object from the hrs array
    const selectedHr = hrs.find(hr => hr.hrName === selectedHRId);

    if (!selectedHr) {
      alert('Please select a valid HR');
      return;
    }

    const response = await axios.put(`http://localhost:5000/api/updateJob/${jobId}`, {
      hrName: selectedHr.hrName, // Use the HR Name from the selected HR object
      admintohr: true
    });

    if (response.status === 200) {
      setCompanyJobs(prevJobs =>
        prevJobs.filter(job => job._id !== jobId) // Remove the assigned job from the list
      );
      alert('Job assigned to HR successfully!');
    }
  } catch (error) {
    console.error('Error assigning job to HR:', error.response?.data?.message || error.message);
  }
};




  return (
    <div className="flex flex-col items-center justify-center text-zinc-900 p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Job Listings</h2>
      {!message && <p className="text-red-500">{message}</p>}
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
             Company Logo
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Posted By
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Job Title
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
             Job Location
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Job Type
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
             Ending Date
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Asign to hr
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
        {companyjobs.length > 0 ? (
            companyjobs.map((job) => (
            <tr  className="bg-gray-300 border border-gray-500 md:border-none block md:table-row">
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
              <img className="w-10" src={`http://localhost:5000/${job.companyLogo}`} alt="companyLogo" />
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
               {job.companyName}
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
            {job.jobTitle}
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
            {job.location}
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
             {job.jobType}
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
               {job.applicationDeadline}
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
              <select name="HR" value={selectedHRId} onChange={handleHRChange} >
              <option value="" disabled>-- Choose an option --</option>
                {
                  hrs.map((hr) => (
                    <option key={hr.id} value={hr.hrName} className="text-black">{hr.hrName}</option>
                  ))
                }
              </select>
                <Button className="bg-white-500 text-black p-1 rounded block  md:table-cell" onClick={() => handleAsignHr(job._id)} >
                  Asign
                </Button>
              </td>
            </tr>
  ))
) : (
  <tr>
    <td colSpan="4" className="p-2 text-center">No jobs available</td>
  </tr>
)}
        </tbody>
      </table>

      
             
    </div>
  );
};

export default AdminCompanyJobs;
