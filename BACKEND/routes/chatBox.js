// routes/job.js
const express = require('express');
const router = express.Router();
const Job = require('../models/comapnyjobpost');
const { default: mongoose } = require('mongoose');

// Endpoint to add a chat message
// Endpoint to add a chat message
router.post('/:jobId/chat', async (req, res) => {
  const { jobId } = req.params;
  const { user, message } = req.body;

  // Validate input
  if (!user || !message) {
    return res.status(400).send("User and message are required");
  }

  //console.log("Received message:", req.body);

  try {
    // Check if jobId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).send("Invalid job ID");
    }

    // Find the job
    const job = await Job.findById(jobId);
    //console.log("Job found:", job);

    if (!job) {
      return res.status(404).send("Job not found");
    }

    // Push new chat message to chatBox
    job.chatBox.push({ user, message, timestamp: new Date() });
    await job.save();

//console.log("Updated chatBox:", job.chatBox); // Log the updated chatBox
    return res.status(200).send(job.chatBox);
  } catch (error) {
    console.error("Error saving message:", error); // Log the error for debugging
    return res.status(500).send("Error saving message: " + error.message);
  }
});


module.exports = router;
