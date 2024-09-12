// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const PDFDocument = require('pdfkit');
// const { v4: uuidv4 } = require("uuid");
// const path = require('path');
// const app = express();
// // const Resume = require('./models/resumeModel');

// // Middleware
// app.use(cors());
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'uploads'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/ResumeData', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected...'))
// .catch(err => console.error('Could not connect to MongoDB:', err));


// const resumeId = uuidv4();

// // // Define schema and model
// const resumeSchema = new mongoose.Schema({
//   imgURL: String,
//   fullName: String,
//   // email: String,
//   // phone: String,
//   linkdinURL: String,
//   githubURL: String,
//   address: String,
//   summary: String,
//   education: [
//     {
//       degree: String,
//       branch: String,
//       cgpa: String,
//       university: String,
//       startDate: String,
//       endDate: String,
//     }
//   ],
//   experience: String,
//   projectDetails: String,
//   skills: [String], // Specify the type inside the array
//   achievement: String,
//   coverLetter: String,
//   resumeId : {type: String , default: resumeId},
//   createdAt: { type: Date, default: Date.now }
// });

// const Resume = mongoose.model('StudentData', resumeSchema);


// // Serve static files from 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Route for creating a new resume
// app.post('/api/StudentData', upload.single('imgFile'), async (req, res) => {
//   try {
//     const {
//       fullName,
//       // email,
//       // phone,
//       linkdinURL,
//       githubURL,
//       address,
//       summary,
//       experience,
//       projectDetails,
//       skills,
//       achievement,
//       coverLetter,
//       education,
//     } = req.body;
//     console.log(req.body);

//     const imgURL = req.file ? `/uploads/${req.file.filename}` : '';

//     const newResume = new Resume({
//       imgURL,
//       fullName,
//       // email,
//       // phone,
//       linkdinURL,
//       githubURL,
//       address,
//       summary,
//       education: JSON.parse(education),
//       experience,
//       projectDetails,
//       skills: JSON.parse(skills),
//       achievement,
//       coverLetter,
//     });

//     await newResume.save();
//     res.status(201).json({ message: 'Resume saved successfully', StudentData: newResume });
//     // res.status(201).json({ message: 'Resume saved successfully', resumeId: newResume._id });
//   } catch (error) {
//     res.status(400).json({ message: 'Error saving resume', error: error.message });
//   }
// });

// // Route for updating resume by ID
// app.put('/api/StudentData/:id', upload.single('imgFile'), async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       fullName,
//       // email,
//       // mobile,
//       linkdinURL,
//       githubURL,
//       address,
//       summary,
//       experience,
//       projectDetails,
//       skills,
//       achievement,
//       coverLetter,
//       education,
//     } = req.body;

//     const updateData = {
//       fullName,
//       // email,
//       // phone: mobile,
//       linkdinURL,
//       githubURL,
//       address,
//       summary,
//       education: JSON.parse(education),
//       experience,
//       projectDetails,
//       skills: JSON.parse(skills),
//       achievement,
//       coverLetter,
//     };

//     if (req.file) {
//       updateData.imgURL = `/uploads/${req.file.filename}`;
//     }

//     const updatedResume = await Resume.findByIdAndUpdate(id, updateData, { new: true });
//     // const updatedResume = await StudentData.findByIdAndUpdate(id, updateData, { new: true });
//     if (!updatedResume) {
//       return res.status(404).json({ message: 'Resume not found' });
//     }
    
//     res.status(200).json({ message: 'Resume updated successfully', StudentData: updatedResume });
//   } catch (error) {
//     res.status(400).json({ message: 'Error updating resume', error: error.message });
//   }
// });

// // Route for fetching a resume by ID
// app.get('/api/StudentData/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const resume = await Resume.findById(id);
//     if (!resume) {
//       return res.status(404).json({ message: 'Resume not found' });
//     }
//     res.status(200).json({ message: 'Resume fetched successfully', StudentData: resume });
//   } catch (error) {
//     res.status(400).json({ message: 'Error fetching resume', error: error.message });
//   }
// });

// //Route for downloading resume by ID
// app.get('/api/StudentData/:id/download', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const resume = await Resume.findById(id);
//     if (!resume) {
//       return res.status(404).json({ message: 'Resume not found' });
//     }

//     // Generate the PDF
//     const doc = new PDFDocument();
//     res.setHeader('\Content-disposition', 'attachment; filename=resume.pdf');
//     res.setHeader('Content-type', 'application/pdf');
//     doc.pipe(res);
    
//     // Add resume data to the PDF
//     doc.fontSize(20).text(`Resume: ${resume.fullName}`, { align: 'center' });
//     // doc.text(`Email: ${resume.email}`);
//     // doc.text(`Phone: ${resume.phone}`);
//     doc.text(`linkdinURL: ${resume.linkdinURL}`);
//     doc.text(`githubURL: ${resume.githubURL}`);
//     doc.text(`Address: ${resume.address}`, 10, 40);
//     doc.text(`Summary: ${resume.summary}`, 10, 50);
//     resume.education.forEach((edu, index) => {
//       doc.text(`Education ${index + 1}:`, 10, 60 + index * 30);
//       doc.text(`Degree: ${edu.degree}`, 10, 70 + index * 30);
//       doc.text(`Branch: ${edu.branch}`, 10, 80 + index * 30);
//       doc.text(`CGPA: ${edu.cgpa}`, 10, 90 + index * 30);
//       doc.text(`University: ${edu.university}`, 10, 100 + index * 30);
//       doc.text(`Start Date: ${edu.startDate}`, 10, 110 + index * 30);
//       if (edu.currentlyPursuing) {
//         doc.text(`Currently Pursuing`, 10, 120 + index * 30);
//       } else {
//         doc.text(`End Date: ${edu.endDate}`, 10, 120 + index * 30);
//       }
//     });
//     doc.text(`Experience: ${resume.experience}`, 10, 130 + resume.education.length * 30);
//     doc.text(`projectDetails: ${resume.projectDetails}`, 10, 130 + resume.education.length * 30);
//     doc.text(`Skills: ${resume.skills}`, 10, 140 + resume.education.length * 30);
//     doc.text(`Achievement: ${resume.achievement}`, 10, 150 + resume.education.length * 30);
//     doc.text(`Cover Letter: ${resume.coverLetter}`, 10, 160 + resume.education.length * 30);
//     doc.end();
//   } catch (error) {
//     res.status(400).json({ message: 'Error generating PDF', error: error.message });
//   }
// });


// app.listen(5001, () => {
//   console.log('Server is running on port 5001');
// });
