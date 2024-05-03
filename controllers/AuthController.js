const User = require('./../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passwordRegex = /^(?=.*[A-Z]).{8,}$/;

const registerUser = async (req, res) => {
  const { userName, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, error: 'Passwords do not match' });
    }

    // Check if password meets the requirements
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        error: 'Password must contain at least one capital letter and be at least 8 characters long',
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ userName, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


const login = async (req, res) => {
    const { userName, password } = req.body;
  
    try {
      // Find the existing user by userName
      const existingUser = await User.findOne({ userName });
  
      // If user doesn't exist, return an error
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  
      // If passwords don't match, return an error
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // If everything is valid, send a success response
  
      const token = jwt.sign({ 
        userId: existingUser._id,
        userName:existingUser.userName 
      }, process.env.SECRETKEY, { expiresIn: '1h' });
  
  
      res.status(200).json({
        success:true,
         message: 'Login successful',
         token: token
        });
  
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = { 
  registerUser,
  login
};
