const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

// Storage for user images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_images",  // Folder in Cloudinary for user images
    allowedFormats: ["jpg", "jpeg", "png"],
  },
});

// Storage for offer letters
const offerLetterStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "offer_letters", // Folder in Cloudinary for offer letters
    allowedFormats: ["pdf", "doc", "docx"], // Allow specific formats for offer letters
  },
});

// Multer instance for user pictures
const uploadUserImage = multer({ storage: imageStorage });

// Multer instance for offer letters
const uploadOfferLetter = multer({ storage: offerLetterStorage });

module.exports = {
  uploadUserImage,
  uploadOfferLetter,
};