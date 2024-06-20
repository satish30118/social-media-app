const express = require("express");
const multer = require("multer");
const {
  getFeedPosts,
  getUserPosts,
  likePost,
  createPost,
  getUserChats,
} = require("../controller/post.js");
const authorization = require("../middleware/authorization.js");
const router = express.Router();

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/post");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

/* CREATE NEW */
router.post("/addpost", upload.single("picture"), createPost);

/* READ */
router.get("/getposts", getFeedPosts);
router.get("/:userId/posts", getUserPosts);
router.get("/:userId/:receiverId/chats", getUserChats);

/* UPDATE */
router.patch("/:id/like", authorization, likePost);

module.exports = router;
