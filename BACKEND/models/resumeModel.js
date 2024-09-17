const mongoose = require('mongoose');
// const { v4: uuidv4 } = require("uuid");
// const resumeId = uuidv4();

const resumeSchema = new mongoose.Schema({
    // imgURL: String,
    fullName: String,
    linkedinURL: String,
    githubURL: String,
    address: String,
    summary: String,
    education: [
      {
        degree: String,
        branch: String,
        cgpa: String,
        university: String,
        startDate: String,
        endDate: String,
      },
    ],
    experience: String,
    projectDetails: String,
    skills: [String],
    achievement: String,
    coverLetter: String,
    createdAt: { type: Date, default: Date.now },
    userId: String,
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
  
  });
  
  module.exports = mongoose.model("StudentData", resumeSchema);