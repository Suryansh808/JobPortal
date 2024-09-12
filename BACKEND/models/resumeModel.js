
// const mongoose = require('mongoose');
// const { v4: uuidv4 } = require("uuid");

// // const resumeId = uuidv4();

// const educationSchema = new mongoose.Schema({
//   degree: { type: String, required: true },
//   branch: { type: String, required: true },
//   cgpa: { type: String, required: true },
//   university: { type: String, required: true },
//   startYear: { type: String, required: true },
//   endYear: { type: String },
//   currentlyPursuing: { type: Boolean, default: false }
// });

// const resumeSchema = new mongoose.Schema({
//   imgFile: { type: String, required: true },
//   fullName: { type: String, required: true },
//   // email: { type: String, required: true },
//   // mobile: { type: String, required: true },
//   linkdinURL: { type: String, required: true },
//   githubURL: { type: String, required: true },
//   address: { type: String, required: true },
//   summary: { type: String, required: true },
//   education: { type: [educationSchema], required: true },
//   experience: { type: String, required: true },
//   projectDetails: { type: String, required: true },
//   skills: { type: [String], required: true },
//   achievement: { type: String, required: true },
//   coverLetter: { type: String, required: true },
//   resumeId:{type: String, default: uuidv4 },
//   createdAt: { type: Date, default: Date.now }
// });

// const Resume = mongoose.model('StudentData', resumeSchema);
// module.exports = Resume;