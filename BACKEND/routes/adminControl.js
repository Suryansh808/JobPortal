// routes/adminControl.js
const express = require('express');
const mongoose = require('mongoose');
const AdminControl = require('../models/adminControl'); // Import your model
const multer = require('multer');
const path = require('path');
// const { route } = require('./userRoutes');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify your upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique name
  },
});

const upload = multer({ storage });
  
// route to post a logo from admin panel
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  //  console.log(req.file);
  
    // Save file information to the database
    const updatedImage = await AdminControl.findOneAndUpdate(
        {}, // Find the document (you can specify conditions here if needed)
        { logo: req.file.path }, // Update the logo field
        { new: true } // Return the updated document
      );
   // console.log(updatedImage);
    
    try {
      await updatedImage.save();
      res.status(200).json({ message: 'File uploaded successfully', updatedImage });
    } catch (error) {
      console.error('Error saving to database:', error);
      res.status(500).send('Error saving to database.');
    }
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Convert the string ID to a MongoDB ObjectId
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('Invalid ID format');
    }
    // Find the AdminControl document and unset the logo field
    const result = await AdminControl.findOneAndUpdate(
      { _id: id },  // Find the AdminControl document by its ObjectId
      { $unset: { logo: "" } },  // Remove the logo field
      { new: true }  // Return the updated document
    );

    if (!result) {
      return res.status(404).send('AdminControl not found');
    }

    res.status(200).send('Logo deleted successfully');
  } catch (error) {
    console.error('Error deleting logo:', error);
    res.status(500).send('Server error');
  }
});
//Route to handle SLider Images form admin panel 
router.post('/uploadSlider', upload.array('file', 12), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  try {
    const filePaths = req.files.map(file => file.path);
    const SliderImage = await AdminControl.findOneAndUpdate(
      {}, 
      { $push: { slider: { $each: filePaths } } }, 
      { new: true }
    );

    res.status(200).json({ message: 'Files uploaded successfully', SliderImage });
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).send('Error saving to database.');
  }
});



// Route to handle industries from admin panel
router.post('/insert', upload.single('image'), async (req, res) => {
  try {
    const { title, text } = req.body;
    const image = req.file.path; // path to the uploaded file

    // Find the existing document or create a new one
    const result = await AdminControl.findOneAndUpdate(
      {},
      { $push: { industries: { title, image, text } } },
      { new: true, upsert: true }
    );
//console.log("industries",result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete('/api/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    // Convert the string ID to a MongoDB ObjectId
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('Invalid ID format');
    }
    // Find the AdminControl document and unset the logo field
    const result = await AdminControl.findOneAndUpdate(
      { "industries._id": id },  // Find the AdminControl document with the specific industry ID
      { $pull: { industries: { _id: id } } },  // Remove the industry with the specified ID
      { new: true }  // Return the updated document
    );

    if (!result) {
      return res.status(404).send('AdminControl not found');
    }

    res.status(200).send('Logo deleted successfully');
  } catch (error) {
    console.error('Error deleting logo:', error);
    res.status(500).send('Server error');
  }
});


//Route to handle services from admi panel 
router.post('/services', upload.single('serviceImage'), async (req, res) => {
  try {
    const { serviceTitle, serviceText } = req.body;
    
    // Check if file was uploaded
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const serviceImage = req.file.path; // path to the uploaded file
    console.log("service data", req.body, serviceImage);

    // Find the existing document or create a new one
    const result = await AdminControl.findOneAndUpdate(
      {},
      { $push: { services: { title: serviceTitle, image: serviceImage, text: serviceText } } },
      { new: true, upsert: true }
    );

    res.status(200).json(result);
  } catch (error) {
    console.error('Error while handling services:', error.message);
    res.status(500).json({ message: error.message });
  }
});
//Route to handle product from admi panel 
router.post('/product', upload.single('productImage'), async (req, res) => {
  try {
    const { productTitle, productText } = req.body;
    //console.log("product", req.body);
       // Check if file was uploaded
       if (!req.file) {
        throw new Error('No file uploaded');
      }
    const productImage = req.file.path; // path to the uploaded file

    // Find the existing document or create a new one
    const result = await AdminControl.findOneAndUpdate(
      {},
      { $push: { products: { title: productTitle, image: productImage, text: productText } } },
      { new: true, upsert: true }
    );
   // console.log("services", result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error while handling services:', error.message);
    res.status(500).json({ message: error.message });
  }
});
//Route to handle mission from admin panel 
router.post('/mission', upload.none(), async (req, res) => {
  try {
    const { missionText } = req.body; // Extract missionText from the body
    console.log('Received missionText:', missionText);

    // Update the existing document's mission field within missionVision
    const result = await AdminControl.findOneAndUpdate(
      {},
      { $set: { "missionVision.mission": missionText } },  // Update the mission field
      { new: true, upsert: true } // Create the document if it doesn't exist
    );

    res.status(200).json(result);
  } catch (error) {
    console.error('Error while updating mission vision:', error.message);
    res.status(500).json({ message: error.message });
  }
});
//Route to handle vision from admin panel 
router.post('/vission', upload.none(), async (req, res) => {
  try {
    const { vissionText } = req.body; // Extract vissionText from the body
    console.log('Received vissionText:', vissionText);

    // Update the existing document's vission field within missionVision
    const result = await AdminControl.findOneAndUpdate(
      {},
      { $set: { "missionVision.vision": vissionText } },  // Update the vission field
      { new: true, upsert: true } // Create the document if it doesn't exist
    );

    res.status(200).json(result);
  } catch (error) {
    console.error('Error while updating mission vision:', error.message);
    res.status(500).json({ message: error.message });
  }
});
//Route to handle project from admin panel 
router.post('/project', upload.single('projectImage'), async (req, res) => {
  try {
    const { projectTitle, projectText } = req.body;
    console.log("project", req.body);
       // Check if file was uploaded
       if (!req.file) {
        throw new Error('No file uploaded');
      }
    const projectImage = req.file.path; // path to the uploaded file
console.log("img", projectImage)
    // Find the existing document or create a new one
    const result = await AdminControl.findOneAndUpdate(
      {},
      { $push: { projects: { title: projectTitle, image: projectImage, text: projectText } } },
      { new: true, upsert: true }
    );
   // console.log("services", result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error while handling services:', error.message);
    res.status(500).json({ message: error.message });
  }
});
//Route to handle recent update from admin panel
router.post('/recentupdate', upload.single('recentImage'), async (req, res) => {
  try {
    const {  recentText } = req.body;

       // Check if file was uploaded
       if (!req.file) {
        throw new Error('No file uploaded');
      }
    const recentImage = req.file.path; // path to the uploaded file

    // Find the existing document or create a new one
    const result = await AdminControl.findOneAndUpdate(
      {},
      { $push: { recentUpdate: {image: recentImage, text: recentText } } },
      { new: true, upsert: true }
    );
   // console.log("services", result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error while handling services:', error.message);
    res.status(500).json({ message: error.message });
  }
});
//Route to handle press releases from admin panel
router.post('/pressRelease', upload.single('pressImage'), async (req, res) => {
  try {
    const {  pressText } = req.body;

       // Check if file was uploaded
       if (!req.file) {
        throw new Error('No file uploaded');
      }
    const pressImage = req.file.path; // path to the uploaded file

    // Find the existing document or create a new one
    const result = await AdminControl.findOneAndUpdate(
      {},
      { $push: { pressReleases: {image: pressImage, text: pressText } } },
      { new: true, upsert: true }
    );
   // console.log("services", result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error while handling services:', error.message);
    res.status(500).json({ message: error.message });
  }
});

//Route to get all the data of adminControl from admin panel
router.get('/alldata', async (req, res) => {
  try {
    const adminControls = await AdminControl.find();
    if (!adminControls || adminControls.length === 0) {
      return res.status(404).json({ message: 'No admin controls found' });
    }
    res.status(200).json(adminControls);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching admin control data', error });
  }
});










  // Serve uploaded files (optional)
  router.use('/uploads', express.static('Admin'));
































// Get current admin control data
router.get('/', async (req, res) => {
    try {
        const controlData = await AdminControl.find();
        res.status(200).json(controlData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create or update admin control data
router.post('/', async (req, res) => {
    try {
        const controlData = await AdminControl.findOneAndUpdate(
            {}, // Update the first document found
            req.body, // New data
            { upsert: true, new: true } // Create if not exists
        );
        res.json(controlData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a specific item (for example, an industry)
router.delete('/:type/:id', async (req, res) => {
    const { type, id } = req.params;

    try {
        const update = {};
        update[type] = { $pull: { _id: id } }; // Remove the item from the specified type
        await AdminControl.updateOne({}, update);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
