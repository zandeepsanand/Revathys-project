const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const path = require('path');
const jwt = require('jsonwebtoken');
const { secretKey } = require('./util/SecretToken');
// const bodyParser = require('body-parser');

const { MONGO_URL, PORT } = process.env;

// Add error handling for MongoDB connection
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error(`Error connecting to MongoDB at ${MONGO_URL}:`, err);
    process.exit(1);
  });

// Use a dedicated base URL for your routes


// Configure CORS dynamically based on the environment
const allowedOrigins = ['http://localhost:3001', 'https://your-production-url.com'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
// app.use(bodyParser.json());
app.use("/", authRoute);
// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));


const jwtMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Apply the JWT Middleware to specific routes
app.use('/protected-route', jwtMiddleware);

app.get('/protected-route', (req, res) => {
  // Access granted for authenticated users
  res.json({ message: 'Protected route accessed', userId: req.userId });
});


app.get('/api/hello', (req, res) => {
  res.send('Hello, this is your API!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
