

const express = require("express");
const router = express.Router();
const Job = require("../models/comapnyjobpost");
const { default: mongoose } = require("mongoose");

// Endpoint to get chat messages
router.get("/:jobId/chat", async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).send("Job not found");
    }

    return res.status(200).send(job.chatBox); // Send chat messages
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).send("Error fetching messages: " + error.message);
  }
});

// Endpoint to add a chat message
router.post("/:jobId/chat", async (req, res) => {
  const { jobId } = req.params;
  const { user, message } = req.body;

  // Validate input
  if (!user || !message) {
    return res.status(400).send("User and message are required");
  }

  try {
    // Check if jobId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).send("Invalid job ID");
    }

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).send("Job not found");
    }
        // Define newChatMessage here
    const newChatMessage = { user, message, timestamp: new Date() };

    // Push new chat message to chatBox
    // job.chatBox.push({ user, message, timestamp: new Date() });
    job.chatBox.push(newChatMessage);
    await job.save();

    // Notify all connected clients of the new message
    // Call the sendChatMessage function to notify SSE clients
    // job.chatBox.forEach((msg) => sendChatMessage(msg));
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(newChatMessage)}\n\n`));

    return res.status(200).send(job.chatBox);
  } catch (error) {
    console.error("Error saving message:", error);
    return res.status(500).send("Error saving message: " + error.message);
  }
});

let clients = [];

router.get("/:jobId/chat/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  clients.push({ res });

  // Remove client from the list on close
  req.on("close", () => {
    clients = clients.filter(client => client.res !== res);
  });
});

// Export the router
module.exports = router;

