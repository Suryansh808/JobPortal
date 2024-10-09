// // models/Application.js
// const mongoose = require("mongoose");

// const applicationSchema = new mongoose.Schema({
//   jobId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "CompanyJobPostData",
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User",
//   },
//   hrName: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["Pending", "Accepted", "Rejected"],
//     default: "pending",
//   },
//   statusByCompany: {
//     type: String,
//     enum: ["Accepted", "Rejected", "Hired"],
//     default: null,
//   },
//   hrUpdated: {
//     round: [String],
//     date: [String],
//     default: { type: String, default: "Application Send" },
//   },

//   companyUpdated: [String],
//   showToUser: [String],
// });

// module.exports = mongoose.model("Application", applicationSchema);
// models/Application.js

const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "CompanyJobPostData",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  hrName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  statusByCompany: {
    type: String,
    enum: ["Accepted", "Rejected", "Hired"],
    default: null,
  },
  hrUpdated: {
    round: [String],
    date: [String],
    default: { type: String, default: "Application Sent" },
  },
  companyUpdated: [String],
  showToUser: [String],
  // New field for offer letter URL
  offerLetterUrl: {
    type: String,
    default: null, // Default to null if no offer letter is uploaded yet
  },
});

module.exports = mongoose.model("Application", applicationSchema);
