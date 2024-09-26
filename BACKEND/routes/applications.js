// routes/applications.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Application = require('../models/application');
const Job = require('../models/comapnyjobpost');


// POST /api/applications
router.post('/', async (req, res) => {
  try {
    const { jobId, userId, hrName, status , statusByCompany } = req.body;

    console.log(req.body);

    const newApplication = new Application({
      jobId,
      userId,
      hrName,
      status,
      statusByCompany
    });

    await newApplication.save();

     // Prepare the update data
     const updateData = { 
      $addToSet: { 
        userApplicationIds: userId // Add userId and default status
      } 
    };
  
     // Update the job with userId and status
     const jobUpdate = await Job.findByIdAndUpdate(
      jobId,
      updateData,
      { new: true, useFindAndModify: false }
    );
    
     console.log(jobUpdate);
    if (!jobUpdate) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch all applications and populate related fields
router.get('/', async (req, res) => {
  try {

    // Fetch all applications and populate jobId and userId fields in hr page - all applicant details
    const applications = await Application.find()
      .populate('jobId', 'jobTitle companyName location jobType jobTiming salary companyLogo desiredSkills chatBox') // Populate job details
      .populate('userId', 'email phone fullname resumeId') // Populate user details
    
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Route to update status from HR portal
router.put('/status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { status } = req.body;
    console.log(status);

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const application = await Application.findByIdAndUpdate(id, { status }, { new: true });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Route to update status by comapny from company portal
router.put('/statusByCompany/:id', async (req, res) => {
  try {
    const { id } = req.params;
  //  console.log(id);
   // console.log('Updating application with ID:', id);
    const { statusByCompany ,jobId } = req.body;
  //  console.log("getting value from frontend" ,req.body);

    if (!statusByCompany) {
      return res.status(400).json({ message: 'statusByCompany is required' });
    }

  // Validate the ID format
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid application ID' });
  }

     const application = await Application.findOneAndUpdate(
      { userId: id , jobId: jobId}, // Ensure it matches both ID and userId
      { statusByCompany : statusByCompany },
      { new: true } // Return the updated document
    );
   // console.log("find the value and update in the database  ", application);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(application); // Return the updated application
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});





module.exports = router;
