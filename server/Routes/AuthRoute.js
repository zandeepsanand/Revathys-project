const {
  Signup,
  Login,
  Project,
  SelectedProject,
} = require("../Controllers/AuthController");
const router = require("express").Router();
const { userVerification } = require("../Middlewares/AuthMiddleware");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

// router.post('/signup', Signup)
router.get("/project", Project);
router.post("/selectedproject", SelectedProject);
router.post("/login", Login);
router.post("/", userVerification);

router.route("/signup").post(async (req, res) => {
  console.log("Request Payload:", req.body);
  try {
    const { username, email, password, phonenumber, exitmark, createdAt } =
      req.body;

    // Validate input
    if (!username || !email || !password || !phonenumber || !exitmark) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    // Ensure password is defined and is a string
    if (!password || typeof password !== "string") {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }

    // // Hash the password with 10 rounds of salt
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Before user creation");

    // Create a new user
    const user = await User.create({
      username,
      email,
      password,
      phonenumber,
      exitmark,
      createdAt,
    });

    // You may want to customize this token creation based on your needs
    // const accessToken = jwt.sign({ userId: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET);

    // Send a success response
    return res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

router.post("/enroll", async (req, res) => {
    const { userId, projectId } = req.body;

  try {
    const student = await User.findByIdAndUpdate(
        userId,
      { $addToSet: { enrolledProjects: projectId } }, // Use $addToSet to avoid duplicates
      { new: true }
    );

    res.json({ success: true, student });
  } catch (error) {
    console.error("Enroll Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
router.get('/user/:userId/enrolled-projects', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const user = await User.findById(userId).populate('enrolledProjects');
      res.json({ enrolledProjects: user.enrolledProjects });
    } catch (error) {
      console.error('Fetch Enrolled Projects Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;
