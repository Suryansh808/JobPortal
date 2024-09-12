  // models/companyjobpost.js
  const mongoose = require("mongoose");

  const jobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    jobTiming: { type: String, required: true },
    workingDays: { type: String, required: true },
    salary: {
      minSalary: { type: Number, required: true },
      maxSalary: { type: Number, required: true },
      currency: { type: String, default: "INR" },
      per: { type: String, default: "Year" },
    },
    jobDescription: { type: String, required: true },
    desiredSkills: { type: String, required: true },
    experience: { type: Number, required: true },
    noofposition: { type: Number, required: true },
    companyLogo: { type: String, required: true },
    applicationDeadline: { type: Date, required: true },
    jobtoadmin:{type:Boolean , default:false},
    admintohr:{type:Boolean , default:null},
    hrName:{type:String , default:null},
    userApplicationIds:[String] // Array to store user IDs
  });

  const Job = mongoose.model("CompanyJobPostData", jobSchema);
  module.exports = Job;
