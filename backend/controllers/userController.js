import generateTokenAndSetCookie from "../helpers/generateTokenAndSetCookie.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
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

export { signupUser };
