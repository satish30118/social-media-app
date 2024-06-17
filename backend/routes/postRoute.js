const express = require("express");
const {
  getFeedPosts,
  getUserPosts,
  likePost,
  createPost,
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
router.post("/addposts", authorization, upload.single("picture"), createPost);

/* READ */
router.get("/getposts", authorization, getFeedPosts);
router.get("/:userId/posts", authorization, getUserPosts);

/* UPDATE */
router.patch("/:id/like", authorization, likePost);

module.exports = router;
