const express = require("express");
const {
  getFeedPosts,
  getUserPosts,
  likePost,
} = require("../controller/post.js");
const authorization = require("../middleware/authorization.js");

const router = express.Router();

/* READ */
router.get("/getposts", authorization, getFeedPosts);
router.get("/:userId/posts", authorization, getUserPosts);

/* UPDATE */
router.patch("/:id/like", authorization, likePost);

module.exports = router;
