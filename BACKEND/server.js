const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const nodemailer = require("nodemailer");
// const companyuser = require("./routes/companyuser");
const Company = require("./models/companyuser");
// const Job = require('./models/comapnyjobpost');
const CompanyJobPostRoute = require('./routes/companyJobPostRoute');
const companyRoutes = require('./routes/companyJobPostRoute');
const authenticateToken = require('./middleware/authMiddleware');
const authRoutes = require('./routes/companyAuth');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 const { v4: uuidv4 } = require("uuid");
const cors = require('cors');
const Counter = require('./models/counter');
const hrRoutes = require('./routes/hrRoutes');
const Otp = require('./models/adminModel');
const app = express();
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const User = require("./models/User");
const applicationRoutes = require('./routes/applications');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '300mb' }));
app.use(bodyParser.urlencoded({ limit: '300mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true })); // For URL encoded data
app.use(express.json());



// Routes
app.use("/api", CompanyJobPostRoute);
app.use("/api/jobs", CompanyJobPostRoute);
app.use('/api', companyRoutes);
app.use(authRoutes); // Register the auth routes
app.use('/api/hr', hrRoutes);
app.use('/api/applications/:id', applicationRoutes);
app.use('/api/applications', applicationRoutes);
app.use("/api", applicationRoutes);


mongoose.connect("mongodb://127.0.0.1:27017/otp-auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Failed to connect to MongoDB', err);
});



const resumeId = uuidv4();

// Define schema and model
const resumeSchema = new mongoose.Schema({
  // imgURL: String,
  fullName: String,
  linkdinURL: String,
  githubURL: String,
  address: String,
  summary: String,
  education: [
    {
      degree: String,
      branch: String,
      cgpa: String,
      university: String,
      startDate: String,
      endDate: String,
    },
  ],
  experience: String,
  projectDetails: String,
  skills: [String],
  achievement: String,
  coverLetter: String,
  resumeId: { type: String, default: resumeId },
  createdAt: { type: Date, default: Date.now },
  userId: String,

});

const Resume = mongoose.model("StudentData", resumeSchema);


// Configure multer for file uploads
// const resumeStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "resumeimages"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const resumeimage = multer({ resumeStorage });

// Serve static files from 'uploads' directory
// app.use("/uploads", express.static(path.join(__dirname, "resumeimage")));

const resume = multer(); // Configure multer as needed
// Route for creating a new resume
app.post("/api/StudentData", resume.none(),  async (req, res) => {
  try {
    const {
      fullName,
      linkdinURL,
      githubURL,
      address,
      summary,
      experience,
      projectDetails,
      skills,
      achievement,
      coverLetter,
      education,
      userId,
     
    } = req.body;
   // console.log('Received data:', req.body);



    // const imgURL = req.file ? `/resumeimage/${req.file.filename}` : "";

    const newResume = new Resume({
      // imgURL,
      fullName,
      linkdinURL,
      githubURL,
      address,
      summary,
      education: JSON.parse(education),
      experience,
      projectDetails,
      skills: JSON.parse(skills),
      achievement,
      coverLetter,
      userId,
      
    });

    await newResume.save();
    res
      .status(201)
      .json({ message: "Resume saved successfully", StudentData: newResume });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error saving resume", error: error.message });
  }
});

// Route for updating resume by ID
app.put("/api/StudentData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      linkdinURL,
      githubURL,
      address,
      summary,
      experience,
      projectDetails,
      skills,
      achievement,
      coverLetter,
      education,
    } = req.body;

    const updateData = {
      fullName,
      linkdinURL,
      githubURL,
      address,
      summary,
      education: JSON.parse(education),
      experience,
      projectDetails,
      skills: JSON.parse(skills),
      achievement,
      coverLetter,
    };

    // if (req.file) {
    //   updateData.imgURL = `/resumeimage/${req.file.filename}`;
    // }

    const updatedResume = await Resume.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res
      .status(200)
      .json({
        message: "Resume updated successfully",
        StudentData: updatedResume,
      });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating resume", error: error.message });
  }
});

// Route for fetching a resume by ID
app.get("/api/StudentData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res
      .status(200)
      .json({ message: "Resume fetched successfully", StudentData: resume });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching resume", error: error.message });
  }
});

// Route for downloading resume by ID
app.get("/api/StudentData/:id/download", async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Generate the PDF
    const doc = new PDFDocument();
    res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    // Add resume data to the PDF
    doc.fontSize(20).text(`Resume: ${resume.fullName}`, { align: "center" });
    doc.text(`linkdinURL: ${resume.linkdinURL}`);
    doc.text(`githubURL: ${resume.githubURL}`);
    doc.text(`Address: ${resume.address}`, 10, 40);
    doc.text(`Summary: ${resume.summary}`, 10, 50);
    resume.education.forEach((edu, index) => {
      doc.text(`Education ${index + 1}:`, 10, 60 + index * 30);
      doc.text(`Degree: ${edu.degree}`, 10, 70 + index * 30);
      doc.text(`Branch: ${edu.branch}`, 10, 80 + index * 30);
      doc.text(`CGPA: ${edu.cgpa}`, 10, 90 + index * 30);
      doc.text(`University: ${edu.university}`, 10, 100 + index * 30);
      doc.text(`Start Date: ${edu.startDate}`, 10, 110 + index * 30);
      if (edu.currentlyPursuing) {
        doc.text(`Currently Pursuing`, 10, 120 + index * 30);
      } else {
        doc.text(`End Date: ${edu.endDate}`, 10, 120 + index * 30);
      }
    });
    doc.text(
      `Experience: ${resume.experience}`,
      10,
      130 + resume.education.length * 30
    );
    doc.text(
      `projectDetails: ${resume.projectDetails}`,
      10,
      140 + resume.education.length * 30
    );
    doc.text(
      `Skills: ${resume.skills}`,
      10,
      150 + resume.education.length * 30
    );
    doc.text(
      `Achievement: ${resume.achievement}`,
      10,
      160 + resume.education.length * 30
    );
    doc.text(
      `Cover Letter: ${resume.coverLetter}`,
      10,
      170 + resume.education.length * 30
    );
    doc.end();
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error generating PDF", error: error.message });
  }
});


const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  updatedOn: String,
  impressions: Number,
  daysLeft: Number,
  description: String
});

const Job = mongoose.model('Job', jobSchema);

app.use("/api", userRoutes);
app.get('/api/users', async (req, res) => {
  try {
      const users = await User.find(); // Fetch all users
      res.json(users); // Send the user data as JSON
  } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
  }
});

app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Admin Login start
// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'saxena.suryansh@krutanic.net',
    pass: 'wuve esae ixbx ccvk',
  },
});

// Send OTP endpoint
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

  await Otp.updateOne({ email }, { otp, expiresAt }, { upsert: true });

  const mailOptions = {
    from: 'saxena.suryansh@krutanic.net',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('OTP sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send OTP');
  }
});

// Verify OTP endpoint
app.post('/api/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  const record = await Otp.findOne({ email, otp, expiresAt: { $gt: new Date() } });

  if (record) {
    await Otp.deleteOne({ email }); // Clean up the OTP record
    res.status(200).send('OTP verified successfully');
  } else {
    res.status(400).send('Invalid or expired OTP');
  }
});
//Admin Login end

// comapny server code starts

// Set up multer for file upload handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to save the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  }
});

const upload = multer({ storage: storage });

app.post("/api/signup", upload.single('companyLogo'), async (req, res) => {
  try {
    const { companyName, companyLocation, companyType, otherCompanyType, position, businessmodel, email, password ,confirmPassword} = req.body;
    // console.log("Received Data:", req.body); // Log incoming data
    const companyLogo = req.file?.path; // Retrieve the file path
    if (!companyName || !email || !password || !companyLogo ) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: 'Passwords do not match' });
    // }

    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ error: "Company already exists" });
    }
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'companyId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const newCompanyId = `comp${counter.seq}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const company = new Company({
      companyName,
      // companyLocation,
      companyType,
      otherCompanyType,
      position,
      businessmodel,
      email,
      companyId: newCompanyId,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      companyLogo, // Save the file path
    });

    await company.save();

  res.status(201).json({ message: "Company registered successfully", companyId : newCompanyId });
} catch (err) {
  console.error(err.message);
  res.status(500).json({ error: err.message });
}
});

// Serve static files (e.g., for development/testing purposes)
app.use('/uploads', express.static('uploads'));

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
     
    // // Example of creating a token with companyId
    // const token = jwt.sign({ id: company.companyId, companyId: user.companyId }, process.env.JWT_SECRET, { expiresIn: '1h' });
// Debugging: Check the company object and companyName
// console.log("Company Object:", company); // Check the entire company object
// console.log("Company Name:", company.companyName); // Ensure this is a string

    res.json({ token, success: true , companyName: company.companyName, });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;
  const user = await Company.findOne({ email });
  if (!user) return res.status(404).json({ success: false, message: "Company not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpires = Date.now() + 15 * 60 * 1000; // OTP expires in 15 minutes
  await user.save();

  // Send OTP via email (use any email service like SendGrid, Nodemailer, etc.)
  // For now, just log it
  console.log(`OTP sent to ${email}: ${otp}`);

  res.json({ success: true, message: "OTP sent" });
});

app.post("/api/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const user = await Company.findOne({ email, otp });
  if (!user || user.otpExpires < Date.now()) return res.status(400).json({ success: false, message: "Invalid or expired OTP" });

  res.json({ success: true, message: "OTP verified" });
});

app.post("/api/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await Company.findOne({ email });
  if (!user) return res.status(404).json({ success: false, message: " not found" });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.json({ success: true, message: "Password successfully reset" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Company.findOne({ email });
  if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

  res.json({ success: true, message: "Login successful" });
});

app.get('/CompanyDashBoard', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the company dashboard!' });
});

// comapny server code ends

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
