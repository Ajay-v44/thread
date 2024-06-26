import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const postedBy = req.user;
    if (!text)
      return res.status(404).json({ message: " text is a required filed" });
    if (img) {
      const uploadResponse = await cloudinary.uploader.upload(img);
      img = uploadResponse.secure_url;
    }
    const newPost = new Post({ postedBy, text, img });
    await newPost.save();
    res.status(201).json({ message: "post created successfully", newPost });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
    console.log(err.message);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
    console.log(err.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "post Not found" });
    if (post.postedBy.toString() !== req.user._id.toString()) {
      res.status(404).json({ message: "Un Authorized to delete post" });
    }
    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
    console.log(err.message);
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    const usrlikepost = post.likes.includes(userId);
    if (usrlikepost) {
      // unlike
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "un-liked" });
    } else {
      // like
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "liked" });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
    console.log(err.message);
  }
};

const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user.id;
    const userProfilePic = req.user.profilepic;
    const username = req.user.username;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (!text)
      return res.status(404).json({ message: "please enter your comment" });
    const reply = { userId, text, userProfilePic, username };
    post.replies.push(reply);
    await post.save();
    res.status(200).json({ message: "Reply created", reply: post });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
    console.log(err.message);
  }
};
const deleteReplies = async (req, res) => {
  try {
    const { uid, pid, _id } = req.body;
    const post = await Post.findById(pid);
    if (uid !== req.user._id.toString())
      return res.status(400).json({ message: "You Cant Delete Others Posts" });
    const indx = post.replies.findIndex(
      (reply) => reply._id.toString() === _id
    );

    if (indx >= 0) {
      post.replies.splice(indx, 1);
      await post.save();
      console.log(post);
      return res.status(200).json({ message: "Reply deleted" });
    } else {
      return res.status(404).json({ message: "Reply not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const getFeedPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    }
    const following = user.following;
    const feedPost = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });
    res.status(200).json(feedPost);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
    console.log(err.message);
  }
};

export {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPost,
  deleteReplies,
};
