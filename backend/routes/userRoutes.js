const express = require("express");
const multer = require("multer");
const {
  registerUser,
  loginUser,
  updateUser,
  getUserDetail,
  logoutUser,
} = require("../controller/userController");
const { verifyToken } = require("../config/tokenGenerator");

const router = express.Router();

// Setup Multer
const bufferStorage = multer.memoryStorage();
const upload = multer({ storage: bufferStorage });

router.post("/register", upload.single("profile"), registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyToken, logoutUser);
router.put("/update", verifyToken, upload.single("profile"), updateUser);
router.get("/detail", verifyToken, getUserDetail);

module.exports = router;
