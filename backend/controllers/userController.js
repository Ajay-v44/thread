import mongoose from "mongoose";
import generateTokenAndSetCookie from "../helpers/generateTokenAndSetCookie.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import Post from "../models/postModel.js";
const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    if (!name || !email || !username || !password) {
      return res.status(400).json({
        message: "null values are not allowed",
      });
    }
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({
        message: "username or email already registered",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      username,
      password: hashPassword,
    });
    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
        message: "user created successfully",
      });
    } else {
      res.status(400).json({
        message: "invalid data",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
    console.log("Error ", err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "null values are not allowed",
      });
    }
    const user = await User.findOne({ username });
    const isPasswordCrct = await bcrypt.compare(password, user?.password || "");
    if (!user || !isPasswordCrct)
      return res.status(404).json({ message: "Invalid Username Or Password" });
    generateTokenAndSetCookie(user._id, res);
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    res.status(200).json({
      data: userWithoutPassword,
      message: `Welcomeback to threads ${user.username}`,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
    console.log(err.message);
  }
};

const logoutuser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "Logged Out Successfully " });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
    console.log(err.message);
  }
};

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentuser = await User.findById(req.user._id);
    if (id === req.user._id.toString())
      return res.status(400).json({ message: "You cant follow your self" });
    if (!userToModify || !currentuser)
      return res.status(400).json({ message: "User Not Found" });
    const isFollowing = currentuser.following.includes(id);
    if (isFollowing) {
      // unfollow
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // follow
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
    console.log(err.message);
  }
};

const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  let { profilePic } = req.body;
  const userId = req.user.id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "user not found" });
    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ message: "You Cant Update Other Users profile" });
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      user.password = hashPassword;
    }
    if (profilePic) {
      if (user.profilepic) {
        await cloudinary.uploader.destroy(
          user.profilepic.split("/").pop().split(".")[0]
        );
      }
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      user.profilepic = uploadResponse.secure_url;
    }
    user.name = name || user.name;
    user.email = email || email;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user = await user.save();
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    res.status(200).json({
      message: "updated succesfully",
      data: userWithoutPassword,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
    console.log(err.message);
  }
};

const getUserProfile = async (req, res) => {
  const { query } = req.params;

  try {
    let user;
    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query })
        .select("-password")
        .select("-updatedAt")
        .select("-email");
    } else {
      user = await User.findOne({ username: query })
        .select("-password")
        .select("-updatedAt")
        .select("-email");
    }
    //  select("-password") used to not get the that field from db or exclude it

    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
    console.log(err.message);
  }
};

const getuserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ status: 404, message: "usernot found" });
    }
    const post = await Post.find({ postedBy: user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({post});
  } catch (err) {
    console.log(err);
  }
};
export {
  signupUser,
  loginUser,
  logoutuser,
  followUnFollowUser,
  updateUser,
  getUserProfile,
  getuserPosts,
};
