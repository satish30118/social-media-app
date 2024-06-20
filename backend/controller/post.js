const Post = require("../model/Post.js");
const User = require("../model/User.js");

/* CREATE */
const createPost = async (req, res) => {
  try {
    const { userId, receiverId, description } = req.body;

    const user = await User.findById(userId);
    var picturePath = "";
    if (req.file) {
      picturePath = req.file?.path;
    }

    const newPost = new Post({
      userId,
      receiverId,
      name: user?.name,
      description,
      userPicturePath: user?.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post Created",
    });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
    console.log(err);
  }
};

/* READ */
const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find({ receiverId: "public" }).sort({
      createdAt: -1,
    });
    res
      .status(200)
      .json({ success: true, message: "Post Found", details: post });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId, receiverId: "public" }).sort({
      createdAt: -1,
    });
    res
      .status(200)
      .json({ success: true, message: "Found successfully", details: post });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const getUserChats = async (req, res) => {
  try {
    const { userId, receiverId } = req.params;
    const post = await Post.find({
      $or: [
        { userId, receiverId },
        { userId: receiverId, receiverId: userId },
      ],
    });
    res
      .status(200)
      .json({ success: true, message: "Found successfully", details: post });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

/* UPDATE */
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "like Updated", details: updatedPost });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

module.exports = {
  createPost,
  getFeedPosts,
  getUserPosts,
  getUserChats,
  likePost,
};
