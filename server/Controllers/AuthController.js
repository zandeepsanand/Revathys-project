const User = require("../models/UserModel")
const Project = require("../models/ProjectModel")
const SelectedProject = require("../models/SelectedProject")

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { createSecretToken } = require("../util/SecretToken");



module.exports.Signup = async (req, res, next) => {
  try {
    const { username, email, password, phonenumber, exitmark, createdAt } = req.body;

    // Validate input
    if (!username || !email || !password || !phonenumber || !exitmark || !createdAt) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists', success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    // Send the JWT as a cookie and in the response
    res.cookie('token', token, { httpOnly: true });
    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phonenumber,
      exitmark,
      createdAt,
    });

    // You may want to customize this token creation based on your needs
    // const accessToken = jwt.sign({ userId: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET);

    // Send a success response
    res.status(201).json({ message: 'User signed up successfully', success: true });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};
  

  module.exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Both email and password are required', success: false });
      }
  
      // Check if the user with the provided email exists
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.json({ message: 'Incorrect email', success: false });
      }
  
      // Compare the provided password with the hashed password in the database
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return res.json({ message: 'Incorrect password', success: false });
      }
  
      // Create a JWT token
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
  
      // Set the token in a cookie (you may want to use a more secure method)
      res.cookie('token', token, {
        httpOnly: true,
        // other cookie options...
      });
  
      res.status(200).json({ message: 'User logged in successfully', success: true, user, token });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ message: 'Internal Server Error', success: false });
    }
  };



  module.exports.Project = async (req, res, next) => {
    try {
      const projects = await Project.find();
      if (!projects.length) return res.status(204).json({ 'message': 'No projects found' });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  module.exports.SelectedProject = async (req, res, next) => {
    try {
      const { projectId, title, email } = req.body;
  
      // Find the project by ID
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }
  
      // Update the user's selected project in the database
      const user = await User.findOneAndUpdate(
        { email },
        { $set: { selectedProject: { projectId, title } } },
        { new: true }
      );
  
      res.json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }