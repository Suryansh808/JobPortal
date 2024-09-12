// models/CompanyToAdmin.js

const mongoose = require('mongoose');

const companyToAdminSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String, required: true },
  jobDescription: { type: String, required: true },
  applicationDeadline: { type: Date, required: true },
  companyLogo: { type: String },
  desiredSkills: { type: String },
  eligibility: { type: String },
  experience: { type: Number },
  jobTiming: { type: String },
  salary: {
    minSalary: { type: Number },
    maxSalary: { type: Number },
    currency: { type: String },
    per: { type: String },
  },
  workingDays: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const CompanyToAdmin = mongoose.model('CompanyToAdmin', companyToAdminSchema);

module.exports = CompanyToAdmin;
