// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dzqtl9zvg',  // Store these in environment variables
  api_key: '867918166335518',
  api_secret: 'OD6jwcGLwMFTXoXnt4KxRV84bEg',
});

module.exports = cloudinary;