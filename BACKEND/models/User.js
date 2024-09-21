const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  imageUrl:{ type: String },
  fullname:{ type: String},
  phone: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  otp: String,
  otpExpiration: Date,
  createdAt: {type: String, default: () => new Date().toLocaleDateString('en-GB'), },
  jobLimit:{type:Number, default:2},
  userId: { type: String, required: true, unique: true},
  resumeId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'StudentData' },
  
});

const User = mongoose.model("User", userSchema);

module.exports = User;





