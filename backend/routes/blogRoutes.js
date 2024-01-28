const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getSingleBlog,
  getMyBlogs,
  updateBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  serachBlog,
  addComment,
  getComments,
} = require("../controller/blogController");
const { verifyToken } = require("../config/tokenGenerator");
const router = express.Router();
const multer = require("multer");

// Setup Multer
const bufferStorage = multer.memoryStorage();
const upload = multer({ storage: bufferStorage });

router.post("/blog", verifyToken, upload.single("image"), createBlog);
router.get("/blog", getAllBlogs);
router.get("/blog/title", serachBlog);
router.get("/blog/:id", verifyToken, getSingleBlog);
router.delete("/blog/:id", verifyToken, deleteBlog);
router.put("/blog/:id", verifyToken, upload.single("image"), updateBlog);
router.get("/myblogs", verifyToken, getMyBlogs);

router.post("/blog/like/:id", verifyToken, likeBlog);
router.post("/blog/dislike/:id", verifyToken, disLikeBlog);
router.post("/blog/comment/:id", verifyToken, addComment);
router.get("/blog/comment/:id", verifyToken, getComments);

module.exports = router;
