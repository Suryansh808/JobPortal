// Define a schema and model
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    message: String,
  });
  
  const FormData = mongoose.model('ContactUsData', formSchema);
  module.exports = FormData;