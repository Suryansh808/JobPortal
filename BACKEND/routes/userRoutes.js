const express = require("express");
const User = require("../models/User");
const userpicture = require("../multerConfig");
const router = express.Router();
const Resume = require('../models/resumeModel');
const UserIdCounter = require("../models/userIdCounter");





router.post("/check-user", async (req, res) => {
  const { phone } = req.body;
  const user = await User.findOne({ phone });
  res.json({ exists: !!user });
});


router.post("/send-otp", userpicture.single("image"),  async (req, res) => {

  const {fullname, phone , email } = req.body;
  console.log(req.body);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  let user = await User.findOne({ phone });
  const imageUrl = req.file ? req.file.path : null;

 
  if (!user) {
    // Get the next user ID
    let userIdCounter = await UserIdCounter.findOneAndUpdate(
      {},
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    const userId = `user${String(userIdCounter.sequence_value).padStart(2, '0')}`;
     

    user = new User({
      userId,
      fullname,
      phone,
      email,
      otp,
      otpExpiration,
      imageUrl,
    });

  } else {
    // Update existing user details
    // user.fullname = fullname;  // Update full name if user already exists
    user.otp = otp;
    user.otpExpiration = otpExpiration;
    if(imageUrl){
      user.imageUrl = imageUrl;
    }
  }
  await user.save();
  // Replace with actual SMS sending logic
  console.log(`OTP sent to ${phone}: ${otp}`);
  res.json({ success: true, userId: user.userId , id: user.id });
});


router.post("/verify-otp", async (req, res) => {
  const { phone, otp } = req.body;
  const user = await User.findOne({ phone, otp });

  if (user && user.otpExpiration > Date.now()) {
    res.json({
      success: true,
      user: {
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        imageUrl: user.imageUrl,  // Return image URL
      }
    });
  } else {
    res.json({ success: false });
  }
});
// Get all resumes with user details
router.get('/resumes', async (req, res) => {
  try {
    const resumes = await Resume.find().populate('user');
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to get user data by userId for render on Profile 
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    //console.log(userId);
    // Fetch user from the database
    const user = await User.findOne({ _id: userId });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to get users by IDs for the company portal
router.get('/users', async (req, res) => {
  try {
    const { ids } = req.query; // Get the ids from the query parameters
    if (!ids) {
      return res.status(400).json({ message: 'No user IDs provided' });
    }
    
    const userIds = ids.split(',').map(id => id.trim()); // Split the string into an array and trim whitespace
    const users = await User.find({ _id: { $in: userIds } }); // Fetch users with the specified IDs

    res.json(users); // Return the found users
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
