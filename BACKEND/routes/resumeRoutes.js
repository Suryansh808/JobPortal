const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Resume = require('../models/resumeModel'); // Adjust the path if needed

// Route to get resume by ID
router.get('/:userID', async (req, res) => {
  try {
    // Extract resumeId from route parameters
    const { userID } = req.params;
  

    // Convert resumeId to mongoose ObjectId if it's a valid hexadecimal string
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid resume ID' });
    }

    // Find resume by ID
    const resume = await Resume.find({userID: userID});


    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Respond with resume data
    res.status(200).json(resume);
  } catch (error) {
    console.error('Error fetching resume data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//route to render the resume data in the comapny portal - chatbox ke pass
// Get resume by ID
router.get('/:resumeId', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.resumeId);
    console.log("reciveing data from frontend", resume);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
