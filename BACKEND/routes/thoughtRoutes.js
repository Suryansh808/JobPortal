// routes/thoughtRoutes.js
const express = require('express');
const Thought = require('../models/thoughtModel');
const router = express.Router();

// Create a new thought
router.post('/thoughts', async (req, res) => {
  try {
    const newThought = new Thought({
      text: req.body.text,
      replies: []
    });

    const savedThought = await newThought.save();
    res.status(201).json(savedThought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a reply to a thought
router.post('/thoughts/:id/replies', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    thought.replies.push({ text: req.body.text });
    await thought.save();
    res.status(200).json(thought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/thoughts', async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/thoughts/:id/replies', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) return res.status(404).json({ message: 'Thought not found' });
  
      thought.replies.push({ text: req.body.text });
      await thought.save();
      res.status(200).json(thought);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });



// Show a thought
router.patch('/thoughts/:id/show', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) return res.status(404).json({ message: 'Thought not found' });
  
      thought.visible = "show";
      await thought.save();
      res.status(200).json(thought);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Hide a thought
  router.patch('/thoughts/:id/hide', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) return res.status(404).json({ message: 'Thought not found' });
  
      thought.visible = "hide";
      await thought.save();
      res.status(200).json(thought);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Show a reply
router.patch('/thoughts/:thoughtId/replies/:replyIndex/show', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) return res.status(404).json({ message: 'Thought not found' });
  
      const reply = thought.replies[req.params.replyIndex];
      if (!reply) return res.status(404).json({ message: 'Reply not found' });
  
      reply.visible = "show";
      await thought.save();
      res.status(200).json(thought);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Hide a reply
  router.patch('/thoughts/:thoughtId/replies/:replyIndex/hide', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) return res.status(404).json({ message: 'Thought not found' });
  
      const reply = thought.replies[req.params.replyIndex];
      if (!reply) return res.status(404).json({ message: 'Reply not found' });
  
      reply.visible = "hide";
      await thought.save();
      res.status(200).json(thought);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  


module.exports = router;
