const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  phonenumber: {
    type: String,
    required: [true, "Your phonenumber is required"],
  },
  exitmark: {
    type: String,
    required: [true, "Your mark is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  enrolledProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  jwtToken: {
    type: String,
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // If password is not modified, move to the next middleware
  }

  try {
    this.password = await bcrypt.hash(this.password, 10); // Hash the password with 10 rounds of salt
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
