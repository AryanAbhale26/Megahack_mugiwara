const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../lib/utils");
// const { cloudinary } = require("../lib/cloudinary");

const signup = async (req, resp) => {
  try {
    console.log("Incoming request body:", req.body); // Debugging line

    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return resp.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return resp
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return resp.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save(); // Save the new user

    generateToken(newUser._id, resp); // Generate JWT token

    return resp.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in SignUp Controller:", error.message);
    return resp.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, resp) => {
  try {
    console.log("Incoming request body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return resp
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return resp.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return resp.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, resp);

    return resp.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic || null,
      },
    });
  } catch (error) {
    console.error("Error in login Controller:", error.message);
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = async (req, resp) => {
  try {
    resp.cookie("jwt", "", { maxAge: 0 });
    return resp.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// const updateProfile = async (req, resp) => {
//   try {
//     const { profilePic } = req.body;
//     const userId = req.user._id;

//     if (!profilePic) {
//       return resp.status(400).json({ message: "Profile picture is required" });
//     }

//     const uploadResponse = await cloudinary.uploader.upload(profilePic);
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { profilePic: uploadResponse.secure_url },
//       { new: true }
//     );

//     return resp.status(200).json({
//       message: "Profile updated successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error("Error in Update Profile Controller:", error.message);
//     return resp.status(500).json({ message: "Internal Server Error" });
//   }
// };

const checkAuth = async (req, resp) => {
  try {
    return resp.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Error in checkAuth:", error.message);
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { loginUser, signup, logout, checkAuth };
