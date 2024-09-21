const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // OTP expires in 5 minutes
  used: { type: Boolean, default: false },
});

const Compotp = mongoose.model('Compotp', otpSchema);
module.exports = Compotp;