// Create a schema for OTPs
const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
    email: String,
    otp: String,
    expiresAt: Date,
  });
  
  const Otp = mongoose.model('Otp', otpSchema);