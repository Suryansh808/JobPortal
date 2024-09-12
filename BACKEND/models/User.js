const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  imageUrl: String,
  fullname:String,
  phone: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  otp: String,
  otpExpiration: Date,
  createdAt: { type: Date, default: Date.now },
  jobLimit:{type:Number, default:2},
  userId: { type: String, required: true, unique: true},
  uuid: { type: String, required: true, unique: true } // Ensure UUID is required and unique
  
});

const User = mongoose.model("User", userSchema);

module.exports = User;





