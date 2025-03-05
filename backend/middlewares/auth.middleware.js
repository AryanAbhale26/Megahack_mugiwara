const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const protectRoute = async (req, resp, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return resp
        .status(401)
        .json({ message: "Unauthorized No token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return resp
        .status(401)
        .json({ message: "Unauthorized No token Provided" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return resp.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in Protected Route middleware ", error.message);
    resp.status(500).json({ message: "Internal Error" });
  }
};
module.exports = { protectRoute };
