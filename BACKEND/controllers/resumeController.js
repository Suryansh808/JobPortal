const Resume = require('../models/resumeModel');

const saveResume = async (req, res) => {
    try {
      const resumeData = req.body;
      const imgFileUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;
  
      const resume = new Resume({
        ...resumeData,
        imgFile: imgFileUrl
      });
  
      await resume.save();
      res.status(201).json({ StudentData: resume });
    } catch (error) {
      console.error('Error saving resume:', error);
      res.status(500).json({ message: 'Error saving resume' });
    }
  };
  
  module.exports = { saveResume };