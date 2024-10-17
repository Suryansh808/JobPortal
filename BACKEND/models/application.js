const mongoose = require("mongoose");
const { type } = require("os");

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
  offerLetterUrl: {
    type: String,
    default: null,
  },
  userNotification:{type:Boolean ,default:false},
});

module.exports = mongoose.model("Application", applicationSchema);
