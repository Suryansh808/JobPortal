// models/UserIdCounter.js
const mongoose = require('mongoose');

const userIdCounterSchema = new mongoose.Schema({
  sequence_value: { type: Number, default: 0 },
});

const UserIdCounter = mongoose.model('UserIdCounter', userIdCounterSchema);

module.exports = UserIdCounter;