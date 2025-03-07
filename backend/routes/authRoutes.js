const express = require("express");
const router = express.Router();
const {
  signup,
  loginUser,
  logout,
  checkAuth,
} = require("../controllers/authController");
const {
  protectRoute,
  authorizeRoles,
} = require("../middlewares/auth.middleware");

router.post("/signup", signup);
router.post("/login", loginUser);
router.post("/logout", protectRoute, logout);
router.get("/check", protectRoute, checkAuth);

// Admin-only route
router.get("/admin", protectRoute, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

module.exports = router;
