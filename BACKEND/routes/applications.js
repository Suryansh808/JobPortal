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
      status
    });

    await newApplication.save();
      
    // Add userId to the job's userApplicationIds array
    const jobUpdate = await Job.findByIdAndUpdate(
      jobId,
      { $addToSet: { userApplicationIds: userId } },  // Use $addToSet to avoid duplicates
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

// Fetch applications by userId
// router.get('/', async (req, res) => {
//   try {
//     const userId = req.query.userId; // Hardcoded valid ObjectId
//    // console.log("Validating userId:", userId);
//     if (!userId) {
//       return res.status(400).json({ message: "userId is required" });
//     }
   
//     // Validate userId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: "Invalid userId format" });
//     }

//     // Convert to ObjectId using 'new'
//     const userObjectId = new mongoose.Types.ObjectId(userId);
//    // console.log("Valid userId:", userObjectId);

//     const applications = await Application.find({ userId: userObjectId })
//       .populate('jobId', 'jobTitle companyName location jobType jobTiming salary companyLogo');
      
//     res.status(200).json(applications);
//   } catch (error) {
//     console.error("Error fetching applications:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// Fetch all applications and populate related fields
router.get('/', async (req, res) => {
  try {

    // Fetch all applications and populate jobId and userId fields
    const applications = await Application.find()
      .populate('jobId', 'jobTitle companyName location jobType jobTiming salary companyLogo') // Populate job details
      .populate('userId', 'email'); // Populate user details
    
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
