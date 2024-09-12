const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // Document name, e.g., 'companyId'
  seq: { type: Number, default: 0 }        // Sequence number
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
