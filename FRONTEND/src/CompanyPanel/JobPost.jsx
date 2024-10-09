import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, DialogContentText } from "@mui/material";
import axios from "axios";

const JobPost = () => {


  

  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    companyName:"",
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
    noofposition: "",
    companyLogo: "",
    applicationDeadline: "",
  });

  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // To track which job is being edited
  const [confirmationOpen, setConfirmationOpen] = useState(false); // Confirmation dialog state
  const [selectedJob, setSelectedJob] = useState(null); // Job to be sent to HR

  const [postedList,setpostedList] = useState();
  const [jobLimit,setjobLimit] = useState();



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

const handleSubmit = async (e) => {
  e.preventDefault();
  const jobData = {
    jobTitle: jobDetails.jobTitle.trim(),
    companyName: companyName,
    location: jobDetails.location.trim(),
    jobType: jobDetails.jobType.trim(),
    jobTiming: jobDetails.jobTiming.trim(),
    workingDays: jobDetails.workingDays.trim(),
    salary: {
      minSalary: Number(jobDetails.salary.minSalary) || 0,
      maxSalary: Number(jobDetails.salary.maxSalary) || 0,
      currency: jobDetails.salary.currency || "INR",
      per: jobDetails.salary.per || "Year",
    },
    jobDescription: jobDetails.jobDescription.trim(),
    desiredSkills: jobDetails.desiredSkills.trim(),
    experience: Number(jobDetails.experience) || 0,
    noofposition: jobDetails.noofposition.trim(),
    companyLogo: companyLogo,
    applicationDeadline: jobDetails.applicationDeadline.trim(),
    // companyId: companyId, // Ensure this is included
  };

  try {
    if (editingIndex !== null) {
      // Update existing job
      const jobToEdit = jobs[editingIndex];
      // console.log("Editing Index:", editingIndex);
      // console.log("Jobs Array:", jobs);
      // console.log("Job to Edit:", jobToEdit);
      if (!jobToEdit || !jobToEdit._id) {
        throw new Error('Job to edit not found or missing ID');
      }
      const response = await axios.put(`http://localhost:5000/api/jobs/${jobToEdit._id}`, jobData);
      console.log("API Response Data:", response.data);
      const updatedJobs = [...jobs];
      updatedJobs[editingIndex] = response.data;
      setJobs(updatedJobs);
    } else {
      // Add new job
      const response = await axios.post("http://localhost:5000/api/jobs", jobData);
      setJobs([...jobs, response.data]);
      alert("Job Posted Successfully");
      // console.log("Submitting job with Company ID:", companyId); // Debugging
    }
    // Reset form fields
    setJobDetails({
      jobTitle: "",
      companyName: companyName,
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
      noofposition: "",
      companyLogo: companyLogo,
      applicationDeadline: "",
    });
    // Reset editing index and close modal or form
    setEditingIndex(null);
    setOpen(false);
  } catch (error) {
    console.error("There was an error posting the job:", error);
    alert(`Error: ${error.response?.data?.message || error.message}`);
  }
};

const [companyName, setCompanyName] = useState(null);  // Ensure companyName is properly set

  // Combined useEffect for fetching company name and jobs
  // useEffect(() => {
    const fetchCompanyNameAndJobs = async () => {
      // Fetch company name from localStorage
      const storedCompanyName = localStorage.getItem('companyName');
      if (storedCompanyName) {
        console.log("Company name fetched from localStorage:", storedCompanyName); // Debugging line
        setCompanyName(storedCompanyName); // Set the companyName state

        // Proceed to fetch jobs after setting companyName
        try {
          console.log(`Requesting jobs for company: ${storedCompanyName}`); // Debugging line to ensure correct URL
          const encodedCompanyName = encodeURIComponent(storedCompanyName.trim());
          console.log(`Requesting jobs for encoded company: ${encodedCompanyName}`); // Debugging line

          // Fetch jobs from API based on company name
          const response = await axios.get(`http://localhost:5000/api/jobs/${encodedCompanyName}`);
          console.log("API Response:", response.data); // Debugging line
          setJobs(response.data.filter(job => !job.jobtoadmin));
          console.log("Fetched from database:", response.data);

          // const postedList = (response.data.filter(job => job.jobtoadmin).length);
          setpostedList(response.data.filter(job => job.jobtoadmin).length);
      console.log(postedList);

          // response.data.filter(job => job.jobtoadmin).length
          con
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      } else {
        console.log("Company name is missing in localStorage."); // Debugging line
      }
    };
  useEffect(() => {
    fetchCompanyNameAndJobs(); // Invoke the combined function
  }, []); // Empty dependency array ensures it runs once on component mount

  const handleAddJob = () => {
    setEditingIndex(null);
    setOpen(true);
  };

  const handleEditJob = (index) => {
    setJobDetails(jobs[index]);
    setEditingIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingIndex(null);
  };

 
  const handleSendToHR = (job) => {
      setSelectedJob(job);
    setConfirmationOpen(true);

    
  };

  const handleConfirmSendToHR = async () => {
    if (!selectedJob) return;
    

    const updatedJob = { ...selectedJob, jobtoadmin: true, admintohr: false };
    try {
      // const response = 
      await axios.put(`http://localhost:5000/api/jobs/${selectedJob._id}`, updatedJob);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== selectedJob._id));
      
    } catch (error) {
      console.error('Error sending job to HR:', error.response?.data?.message || error.message);
    }
    fetchCompanyNameAndJobs();
   
    setConfirmationOpen(false);
    setSelectedJob(null);
  

  };

  const handleCancelSendToHR = () => {
    setConfirmationOpen(false);
    setSelectedJob(null);
    danish();
  };

  const [companyLogo ,setCompanyLogo] = useState(null);
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
        console.log("response data",data);
        setjobLimit(data.jobPostLimit);
        setCompanyLogo(data.companyLogo);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCompanyData();
  }, []);
    


  return (
    <div className="flex flex-col items-center justify-center text-zinc-900 p-4" > 
      <h2 className="text-2xl font-bold mb-4 text-white">Job Listings of {companyName}</h2>
      
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Job Title
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Location
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Desired Skills
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
             No of Position
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Application Deadline
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {jobs.map((job, index) => (
            <tr key={index} className="bg-gray-300 border border-gray-500 md:border-none block md:table-row">
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                {job.jobTitle}
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                {job.location}
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                {job.desiredSkills}
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                {job.noofposition}
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                {job.applicationDeadline}
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                <Button
                  onClick={() => handleEditJob(index)}
                  className="bg-white text-black border p-1 rounded"
                >
                  Edit
                </Button>


                {
  postedList < jobLimit ? (
    <Button
      onClick={() => handleSendToHR(job)}
      className="bg-white text-black border p-1 rounded"
    >
      Update
    </Button>
  ) : (
    <button className="bg-blue-500 text-white p-1 rounded">Subscribe</button>
  )
}



                {/* <Button
                  onClick={() => handleSendToHR(job)}
                  className="bg-white text-black border  p-1 rounded"
                >
                  Update
                </Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        onClick={handleAddJob}
        className="bg-blue-800 text-white p-2 rounded mt-4"
      >
        Add/Post Job
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editingIndex !== null ? "Edit Job" : "Post a New Job"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            {/* Form fields for job details */}
            <TextField
              name="jobTitle"
              label="Job Title"
              value={jobDetails.jobTitle}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              name="location"
              label="Location"
              value={jobDetails.location}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              name="jobType"
              label="Job Type (e.g., In Office)"
              value={jobDetails.jobType}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              name="jobTiming"
              label="Job Timing (e.g., Full Time)"
              value={jobDetails.jobTiming}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              name="workingDays"
              label="Working Days (e.g., 5 Days)"
              value={jobDetails.workingDays}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              name="minSalary"
              label="Minimum Salary"
              type="number"
              value={jobDetails.salary.minSalary}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              name="maxSalary"
              label="Maximum Salary"
              type="number"
              value={jobDetails.salary.maxSalary}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              name="jobDescription"
              label="Job Description"
              value={jobDetails.jobDescription}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              name="desiredSkills"
              label="Desired Skills"
              value={jobDetails.desiredSkills}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              name="experience"
              label="Experience (e.g., 1 Year)"
              value={jobDetails.experience}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              name="noofposition"
               type="number"
              label="No of Position"
              value={jobDetails.noofposition}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              name="applicationDeadline"
              label="Application Deadline"
              type="date"
              value={jobDetails.applicationDeadline}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {editingIndex !== null ? "Update Job" : "Post Job"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Sending Job to HR */}
      <Dialog open={confirmationOpen} onClose={handleCancelSendToHR}>
        <DialogTitle>Confirm Send to HR</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to send this job posting to HR? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSendToHR}>Cancel</Button>
          <Button onClick={handleConfirmSendToHR} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog> 
    </div>
  );
};
export default JobPost;
