const express = require('express');
const router = express.Router();
const HR = require('../models/HRUser');
const generateHrId = require('../utils/generatedHrId');

// Create a new HR
router.post('/create', async (req, res) => {
  try {
    const { hrName, hrUserId, hrPassword } = req.body;
    
    const hrId = await generateHrId();

    const newHR = new HR({
      hrName,
      hrUserId,
      hrPassword,
      hrId
    });

    await newHR.save();
    res.status(201).json({ message: 'HR created successfully', hr: newHR });
  } catch (error) {
    res.status(500).json({ message: 'Error creating HR', error });
  }
});

// Fetch all HRs
router.get('/', async (req, res) => {
  try {
    const hrs = await HR.find();
    res.status(200).json(hrs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching HRs', error });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { hrUserId, hrPassword } = req.body;
 //   console.log(req.body); // Log the request body

    // Find the HR user by hrUserId
    const hr = await HR.findOne({ hrUserId });
   // console.log(hr); // Log the found HR user

    if (!hr) {
      return res.status(400).json({ message: 'Invalid HR User ID or Password' });
    }

    // Directly compare the provided password with the stored password
    if (hr.hrPassword === hrPassword) {
      res.status(200).json({ message: 'Login successful', hr });
    } else {
      res.status(400).json({ message: 'Invalid HR User ID or Password' });
    }
  } catch (error) {
    console.error('Error logging in:', error); // Log detailed error
    res.status(500).json({ message: 'Error logging in', error });
  }
});
module.exports = router;
