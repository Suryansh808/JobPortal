// // routes/resumeRoutes.js
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const { saveResume } = require('../controllers/resumeController');

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// router.post('/api/Resumes', upload.single('imgFile'), saveResume);

// module.exports = router;
