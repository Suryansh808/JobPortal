const mongoose = require('mongoose');

const hrSchema = new mongoose.Schema({
  hrName: { type: String, required: true },
  hrUserId: { type: String, required: true, unique: true },
  hrPassword: { type: String, required: true },
  hrId: { type: String, unique: true }
});


const HR = mongoose.model('HRUsers', hrSchema);

module.exports = HR;
