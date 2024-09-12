// routes/jobRoutes.js
const express = require("express");
const Job = require("../models/comapnyjobpost");
const Company = require('../models/companyuser');
const authenticateToken = require('../middleware/authMiddleware');
const CompanyToAdmin = require('../models/companttoadmin');
const router = express.Router();


// Create a new job
router.post("/jobs", async (req, res) => {
  console.log(req.body); 
  try {
    const {
      jobTitle,
      companyName,
      location,
      jobType,
      jobTiming,
      workingDays,
      salary,
      jobDescription,
      desiredSkills,
      experience,
      noofposition,
      companyLogo,
      applicationDeadline,
    } = req.body;

    
  // Validate required fields
  if (!jobTitle || !companyName || !location || !jobType || !salary || !jobDescription) {
    return res.status(400).json({ error: "Missing required fields" });
  }
     // Create a new job post
     const newJob = new Job({
      jobTitle,
      companyName, 
      location,
      jobType,
      jobTiming,
      workingDays,
      salary,
      jobDescription,
      desiredSkills,
      experience,
      noofposition,
      companyLogo,
      applicationDeadline,
      // companyId, 
    });

    await newJob.save();
    res.status(201).json(newJob);
    //console.log("jobs data" , newJob)
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an existing job
router.put("/jobs/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const updateData = req.body;


   // Find the job by ID and update it with the new data
    const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
   // console.log("edit data", updatedJob);
      // Check if job was found and updated
      if (!updatedJob) {
        return res.status(404).json({ error: "Job not found" });
      }
    res.status(200).json(updatedJob);
  } catch (err) {
    console.error("Error updating job:", err.message);
    res.status(400).json({ error: err.message });
  }
});

//Route to get company job post data based on companyName
router.get('/jobs/:companyName', async (req, res) => {
  const { companyName } = req.params; // Fetch the companyName from query parameters
 // console.log("Received companyName in backend:", companyName);  // Add this line
  try {
    if (companyName) {
    //  console.log("Fetching jobs for companyName:", companyName);  // Debugging line
      const jobs = await Job.find({ companyName}); // Filter jobs by companyName
     // console.log("Jobs found:", jobs);  // Debugging line
      res.json(jobs);
    } else {
     // console.log("Company name is missing in the query parameter.");  // Debugging line
      res.status(400).json({ message: "Company name is required" });
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Error fetching jobs", error });
  }
});

// Fetch all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
});

// Route to get company user data based on the token
router.get('/company', authenticateToken, async (req, res) => {
  try {
   // console.log('Fetching company with Id:', req.user.id);

    // Fetch company data using the ID from the token
    const company = await Company.findById(req.user.id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST route to add job to CompanyToAdmin collection
router.post('/sendToHR', async (req, res) => {
  const jobData = req.body; // All job data sent from the client
 // console.log(jobData , req.body);
  // jobData.admintohr = false;
  try {
    const newJob = new CompanyToAdmin(jobData); // Pass the entire jobData object to Mongoose
    await newJob.save(); // Save to database
    res.status(201).json({ message: 'Job sent to HR successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send job to HR', error: error.message });
  }
});

// Update Job with HR details and admintohr flag
router.put('/updateJob/:jobId', async (req, res) => {
  const { hrName, admintohr } = req.body;
  
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.jobId,
      { 
        hrName, 
        admintohr 
      },
      { new: true } // Return the updated document
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job updated successfully!', updatedJob });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update job', error: error.message });
  }
});

// Route to add a user ID to the job's userApplicationIds array
router.patch('/jobs/:jobId/apply', async (req, res) => {
  const { jobId } = req.params;
  const { userId } = req.body;

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if the user ID is already in the array
    if (job.userApplicationIds.includes(userId)) {
      return res.status(400).json({ message: 'User already applied' });
    }

    // Add the user ID to the array
    job.userApplicationIds.push(userId);
    await job.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
