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
const Resume = require('./models/resumeModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
const Application = require('./models/application');
const resumeRoutes = require('./routes/resumeRoutes');
const chatBox = require('./routes/chatBox');
const Compotp = require("./models/Compotp");
const adminMail = require("./models/adminMail");
// const nodemailer = require("nodemailer");
const expressAsyncHandler = require("express-async-handler");
// const Otp = require("./models/adminModel");

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
app.use("/api", userRoutes);
app.use(authRoutes); // Register the auth routes
app.use('/api/hr', hrRoutes);
app.use('/api/applications/:id', applicationRoutes);
app.use('/api/applications', applicationRoutes);
app.use("/api", applicationRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/studentDatas', resumeRoutes); // Add this line
app.use('/jobs', chatBox);

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



const resume = multer(); // Configure multer as needed
// Route for creating a new resume
app.post("/api/StudentData", resume.none(),  async (req, res) => {
  try {
    const {
      fullName,
      linkedinURL,
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
      userID,
     
    } = req.body;

    const newResume = new Resume({
      // imgURL,
      fullName,
      linkedinURL,
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
      userID
      
    });

    await newResume.save();
    console.log('Resume created:', newResume);
    // Find user and update resumeId
    const user = await User.findById(userID);
    console.log(" userid ",user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   // Check if resumeId field exists in the schema
   if (user.resumeId === undefined) {
    console.error('resumeId field does not exist in the schema');
  } else {
    user.resumeId = newResume._id;
    console.log('Updating user resumeId:', user.resumeId);
    await user.save();

    console.log('User updated with resumeId:', user.resumeId);
  }


    res
      .status(201)
      .json({ message: "Resume saved successfully", StudentData: newResume });
  } catch (error) {
    console.error('Error saving resume:', error); // Add detailed error logging
    res
      .status(400)
      .json({ message: "Error saving resume", error: error.message });
  }
});

// Route for updating resume by ID
app.put("/api/StudentData/:id", async (req, res) => {
  try {
    const { id } = req.params;
        
    if (!id) {
      return res.status(400).json({ message: "Resume ID is required" });
    }
    
    const {
      fullName,
      linkedinURL,
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

    console.log("Update Request Data:", req.body); // Add logging

    const updateData = {
      fullName,
      linkedinURL,
      githubURL,
      address,
      summary,
      education: education ? JSON.parse(education) : [], // Handle optional fields
      experience,
      projectDetails,
     skills: skills ? JSON.parse(skills) : [], // Handle optional fields
      achievement,
      coverLetter,
    };
    
console.log("Data to Update:", updateData); // Add logging


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


app.get('/api/users', async (req, res) => {
  try {
      const users = await User.find(); // Fetch all users
      res.json(users); // Send the user data as JSON
  } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
  }
});

// app.get('/jobs', async (req, res) => {
//   try {
//     const jobs = await Job.find();
//     res.json(jobs);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

//Admin Login start

// inserting  admin into db using api and postman
app.post("/api/admin", async (req, res) => {
  const { email } = req.body;
  try {
    const newAdmin = new adminMail({ email });
    await newAdmin.save();
    res.status(200).json({ message: "Admin email saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save admin email" });
  }
});

// admin otp verfication through mail id

let otpStore = {}; // Store OTPs temporarily

// Setup Nodemailer transporter
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

 // after verification if the admin mail is matched from database the otp is sent directly to the matched mail or not
 app.post("/api/otp-send", expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    try {
      // Fetch the admin email from the database
      const admin = await adminMail.findOne({});
      if (!admin) {
        return res.status(500).json({ error: "Admin email not found" });
      }
      // Check if provided email matches the stored admin email
      if (email !== admin.email) {
        return res.status(401).json({ error: "You are not admin" });
      }
      // If email matches, generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
      otpStore[email] = otp; // Store OTP for the email (assuming otpStore is in memory or session)
      // Setup email options
      var mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: "Your OTP Code",
        text: `Welcome Back Admin. Your OTP code is: ${otp}`, // OTP in email body
      };
      // Send email with OTP using Nodemailer
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: "Failed to send email" });
        } else {
          console.log("Email sent: " + info.response);
          return res
            .status(200)
            .json({ message: "OTP sent successfully to your email!" });
        }
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to process request" });
    }
  })
);

// Route to verify OTP admin
app.post("/api/otp-verify", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  if (otpStore[email] == otp) {
    delete otpStore[email]; // Clear OTP after verification
    return res
      .status(200)
      .json({ message: "OTP verified successfully, login allowed!" });
  } else {
    return res.status(400).json({ error: "Invalid OTP" });
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
     
   

    res.json({ token, success: true , companyName: company.companyName, });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// sending otp
app.post("/api/comp-send-otp", async (req, res) => {
  const { email } = req.body;
 
  const user = await Company.findOne({ email });
 
  if (!user)
    return res
      .status(404)
      .json({ success: false, message: "Company not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
  
  // Save the OTP in the database
  const otpEntry = new Compotp({
    email,
    otp,
    createdAt: Date.now(),
  });
 
  await otpEntry.save();

  // Nodemailer to send the OTP via email
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email address
    to: email, // Receiver email address
    subject: "Your OTP Code",
    text: `Your OTP for resetting your password is ${otp}. This OTP is valid for 5 minutes.`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending OTP email:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to send OTP" });
    } else {
      console.log("OTP email sent:", info.response);
      return res.json({ success: true, message: "OTP sent" });
    }
  });
});

// Verify OTP route
app.post("/api/comp-verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  // Find the OTP entry in the database
  const otpRecord = await Compotp.findOne({ email, otp, used: false });

  if (!otpRecord || otpRecord.createdAt.getTime() + 300000 < Date.now()) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired OTP" });
  }

  // Mark OTP as used
  otpRecord.used = true;
  await otpRecord.save();

  // OTP is valid
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



// Example Express route
app.get('/api/applications/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('userId').exec();
    console.log(application);
    res.json(application);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
