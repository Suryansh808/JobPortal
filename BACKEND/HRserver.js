const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/otp-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Models
const jobsSchema = new mongoose.Schema({
    jobTitle: String,
    companyName: String,
    location: String,
    // skillsRequired: String,
    eligibilty: String,
    experience: String,
    minSalary: Number,
    maxSalary: Number,
    workingDays: String,
    jobType: String,
    startDate: Date,
    endDate: Date,
    description: String,
    updatedOn: { type: Date, default: Date.now },
});

const candidateSchema = new mongoose.Schema({
    name: String,
    jobTitle: String,
    companyName: String,
    experience: String,
    skill: String,
    contactNo: String,
    mailId: String,
    resumeLink: String,
    status: String,
});

const interviewSchema = new mongoose.Schema({
    jobTitle: String,
    companyName: String,
    candidateName: String,
    date: Date,
    time: String,
    location: String,
    interviewerName: String,
    mailId: String,
});

const companyStatusSchema = new mongoose.Schema({
    companyName: String,
    jobTitle: String,
    updatedDate: Date,
    status: String,
    location: String,
});

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    contactNumber: String,
    resumeLink: String,
    appliedJobs: [{ jobId: String, status: String }],
});

const jobs = mongoose.model('HRJobPost', jobsSchema);
const Candidate = mongoose.model('Candidate', candidateSchema);
const Interview = mongoose.model('Interview', interviewSchema);
const CompanyStatus = mongoose.model('CompanyStatus', companyStatusSchema);
const Student = mongoose.model('Student', studentSchema);

// Controllers

// Job Controllers
const createJob = async (req, res) => {
    try {
        const job = new jobs(req.body);
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateJob = async (req, res) => {
    try {
        const job = await jobs.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) return res.status(404).send('Job not found');
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        const job = await jobs.findByIdAndRemove(req.params.id);
        if (!job) return res.status(404).send('Job not found');
        res.status(200).send('Job deleted successfully');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Candidate Controllers
const createCandidate = async (req, res) => {
    try {
        const candidate = new Candidate(req.body);
        await candidate.save();
        res.status(201).json(candidate);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!candidate) return res.status(404).send('Candidate not found');
        res.status(200).json(candidate);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndRemove(req.params.id);
        if (!candidate) return res.status(404).send('Candidate not found');
        res.status(200).send('Candidate deleted successfully');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Interview Controllers
const createInterview = async (req, res) => {
    try {
        const interview = new Interview(req.body);
        await interview.save();
        res.status(201).json(interview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find();
        res.status(200).json(interviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateInterview = async (req, res) => {
    try {
        const interview = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!interview) return res.status(404).send('Interview not found');
        res.status(200).json(interview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteInterview = async (req, res) => {
    try {
        const interview = await Interview.findByIdAndRemove(req.params.id);
        if (!interview) return res.status(404).send('Interview not found');
        res.status(200).send('Interview deleted successfully');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Company Status Controllers
const createCompanyStatus = async (req, res) => {
    try {
        const status = new CompanyStatus(req.body);
        await status.save();
        res.status(201).json(status);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getCompanyStatuses = async (req, res) => {
    try {
        const statuses = await CompanyStatus.find();
        res.status(200).json(statuses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateCompanyStatus = async (req, res) => {
    try {
        const status = await CompanyStatus.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!status) return res.status(404).send('Status not found');
        res.status(200).json(status);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteCompanyStatus = async (req, res) => {
    try {
        const status = await CompanyStatus.findByIdAndRemove(req.params.id);
        if (!status) return res.status(404).send('Status not found');
        res.status(200).send('Status deleted successfully');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Student Controllers
const createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).send('Student not found');
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndRemove(req.params.id);
        if (!student) return res.status(404).send('Student not found');
        res.status(200).send('Student deleted successfully');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Routes

// Job Routes
app.post('/api/jobs', createJob);
app.get('/api/jobs', getJobs);
app.put('/api/jobs/:id', updateJob);
app.delete('/api/jobs/:id', deleteJob);

// Candidate Routes
app.post('/api/candidates', createCandidate);
app.get('/api/candidates', getCandidates);
app.put('/api/candidates/:id', updateCandidate);
app.delete('/api/candidates/:id', deleteCandidate);

// Interview Routes
app.post('/api/interviews', createInterview);
app.get('/api/interviews', getInterviews);
app.put('/api/interviews/:id', updateInterview);
app.delete('/api/interviews/:id', deleteInterview);

// Company Status Routes
app.post('/api/company-status', createCompanyStatus);
app.get('/api/company-status', getCompanyStatuses);
app.put('/api/company-status/:id', updateCompanyStatus);
app.delete('/api/company-status/:id', deleteCompanyStatus);

// Student Routes
app.post('/api/students', createStudent);
app.get('/api/students', getStudents);
app.put('/api/students/:id', updateStudent);
app.delete('/api/students/:id', deleteStudent);

// Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
