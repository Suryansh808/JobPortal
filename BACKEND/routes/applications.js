// routes/applications.js
const express = require('express');
const { uploadOfferLetter } = require("../multerConfig");
const multer = require("multer");
const mongoose = require('mongoose');
const router = express.Router();
const Application = require('../models/application');
const multerStorageCloudinary = require("multer-storage-cloudinary");
const Job = require('../models/comapnyjobpost');
const cloudinary = require("../cloudinaryConfig");

 const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`

// POST /api/applications
router.post('/', async (req, res) => {
  try {
    const { jobId, userId, hrName, status , statusByCompany, hrUpdated ,companyUpdated,  showToUser, } = req.body;

   // console.log(req.body);
   
    
    const newApplication = new Application({
      jobId,
      userId,
      hrName,
      status,
      statusByCompany,
      hrUpdated: 
        {
          round: 'Application Send',
          date: formattedDate,
          default: 'Application Send'
        }
      ,
      companyUpdated, // Include companyUpdated
      showToUser, // Include showToUser
    });
    //  console.log(newApplication);
    await newApplication.save();

     // Prepare the update data
     const updateData = { 
      $addToSet: { userApplicationIds: userId}};
  
     // Update the job with userId and status
     const jobUpdate = await Job.findByIdAndUpdate(
      jobId,
      updateData,
      { new: true, useFindAndModify: false }
    );
    
    // console.log(jobUpdate);
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
      .populate('userId', 'email phone fullname resumeId jobLimit') // Populate user details
    
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
    // Prepare new values for hrUpdated
    const hrUpdatedValues = {};
    
    // Only push to hrUpdated if status is 'accepted'
    if (status === 'Accepted') {
      hrUpdatedValues.round = 'Application View'; // New value to push
      hrUpdatedValues.date = formattedDate; // Replace with formattedDate if needed
    }

    const application = await Application.findByIdAndUpdate(id, { status ,
      
      ...(status === 'Accepted' && {
        $push: {
          'hrUpdated.round': hrUpdatedValues.round,
          'hrUpdated.date': hrUpdatedValues.date
        }
      })
      },
      { new: true, runValidators: true });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
  
     console.log(application);
    res.status(200).json(application);
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to update the hrUpdated data
// Endpoint to update the hrUpdated data based on userId and jobId
router.post("/api/updateCompany", async (req, res) => {
  const { value, date, userId, jobId } = req.body;
  console.log(req.body);
  // Validate incoming request data
  if (!value || !date || !userId || !jobId) {
    return res.status(400).json({ message: "Missing required data" });
  }

  try {
    // Find the company document by userId and jobId and update it
    const updatedCompany = await Application.findOneAndUpdate(
      {
        "userId": userId,  // Match documents by userId
        "jobId": jobId     // Match documents by jobId
      },
      {
        $push: {
          "hrUpdated.round": value,  // Push the new round value into the round array
          "hrUpdated.date": date     // Push the new date value into the date array
        },
      },
      { new: true }  // Return the updated document
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company updated successfully", data: updatedCompany });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ message: "Server error" });
  }
});


//Route to update status by comapny from company portal
router.put('/statusByCompany/:id', async (req, res) => {
  try {
    const { id} = req.params;
    const { statusByCompany ,jobId , remark } = req.body;
   console.log("getting value from frontend" , req.body);

    if (!statusByCompany) {
      return res.status(400).json({ message: 'statusByCompany is required' });
    }

    
  // Validate the ID format
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid application ID' });
  }

     const application = await Application.findOneAndUpdate(
      { userId: id , jobId: jobId}, // Ensure it matches both ID and userId
      { statusByCompany : statusByCompany, $push: { companyUpdated: remark }},
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

//Route to show any message to user if any update form hr portal 
router.put('/showtouser/:id' , async (req,res) => {
  const {jobId, showToUser} = req.body;
  const { id} = req.params;
   console.log(showToUser);
  // console.log(req.body , req.params);
  try {
    const updateUserStatus = await Application.findOneAndUpdate(
      {
        userId: id,  // Match documents by userId
        jobId: jobId     // Match documents by jobId
      },
      {
        $push: {
          showToUser: showToUser,
        },
      },
      { new: true }
    );
    console.log(updateUserStatus);
    if (!updateUserStatus) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User Status updated successfully", data: updateUserStatus });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Define your route for uploading offer letters
router.post('/api/application/upload-offer-letter/:id', uploadOfferLetter.single('offerLetter'), async (req, res) => {
  const { id } = req.params;

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Update the application with the offer letter URL from Cloudinary
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { offerLetterUrl: req.file.path }, // Save Cloudinary URL in offerLetterUrl
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Respond with success and updated application data
    res.status(200).json({ message: 'File uploaded successfully', application: updatedApplication });
  } catch (error) {
    console.error('Error saving offer letter:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
