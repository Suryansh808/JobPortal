// // controllers/authController.js
// const User = require('../models/userModel'); // Assuming you have a User model for MongoDB

// exports.signup = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         // Check if the user already exists
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Create a new user
//         user = new User({
//             username,
//             email,
//             password, // You should hash the password before saving it
//         });

//         await user.save();

//         res.status(201).json({ message: 'User signed up successfully', user });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };
