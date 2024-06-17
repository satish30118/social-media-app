const express = require("express");
const {
  getFeedPosts,
  getUserPosts,
  likePost,
} = require("../controller/post.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

/* READ */
router.get("/getposts", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

module.exports = router;
