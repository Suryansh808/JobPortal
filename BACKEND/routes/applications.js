// routes/applications.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Application = require('../models/application');
const Job = require('../models/comapnyjobpost');


// POST /api/applications
router.post('/', async (req, res) => {
  try {
    const { jobId, userId, hrName, status } = req.body;

    console.log(req.body);

    const newApplication = new Application({
      jobId,
      userId,
      hrName,
      status,
      // userResumeId,
    });

    await newApplication.save();
      
    // Add userId to the job's userApplicationIds array
    const jobUpdate = await Job.findByIdAndUpdate(
      jobId,
      { $addToSet: { userApplicationIds: userId} },  // Use $addToSet to avoid duplicates
      { new: true, useFindAndModify: false }
    );

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

    // Fetch all applications and populate jobId and userId fields
    const applications = await Application.find()
      .populate('jobId', 'jobTitle companyName location jobType jobTiming salary companyLogo') // Populate job details
      .populate('userId', 'email phone'); // Populate user details
    
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

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

module.exports = router;
