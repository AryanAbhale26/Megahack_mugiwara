const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../lib/utils");

const signup = async (req, res) => {
  try {
    const { fullName, email, password, role, location } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["admin", "vendor", "user"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (role === "user" && !location) {
      return res
        .status(400)
        .json({ message: "Location is required for users" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      location: role === "user" ? location : undefined,
    });

    await newUser.save();
    generateToken(newUser._id, res);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        location: newUser.location,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, resp);
    user.token = token ;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: user.token,
        role: user.role,
        location: user.role === "user" ? user.location : undefined,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, resp) => {
  try {
    resp.cookie("jwt", "", { maxAge: 0 });

    const user = await User.findById(req.user?._id);
    if (!user) {
      return resp.status(404).json({ message: "User not found" });
    }
    user.token = undefined;
    await user.save({ validateBeforeSave: false });

    return resp.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

const checkAuth = (req, res) => {
  return res.status(200).json({ user: req.user });
};

module.exports = { signup, loginUser, logout, checkAuth };
