const express = require("express");
const {
  registerUser,
  loginUser,
  privateController,
} = require("../controllers/authControllers");
const protect = require("../middleware/authMiddleware");
const adminProtect = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/private", adminProtect, privateController);

module.exports = router;
