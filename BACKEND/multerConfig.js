const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_images",  // Folder in Cloudinary where images will be stored
    allowedFormats: ["jpg", "jpeg", "png"],
  },
});

const userpicture = multer({ storage });

module.exports = userpicture;
