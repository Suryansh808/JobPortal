const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const adminMail = mongoose.model('adminMail', adminSchema);
module.exports = adminMail;