import express from "express";
import {
  followUnFollowUser,
  getUserProfile,
  getuserPosts,
  loginUser,
  logoutuser,
  signupUser,
  updateUser,
} from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";
const userRouter = express.Router();
userRouter.get("/getprofile/:query", getUserProfile);
userRouter.get("/user/:username", protectRoute, getuserPosts);
userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", protectRoute, logoutuser);
userRouter.post("/follow/:id", protectRoute, followUnFollowUser);
userRouter.patch("/update/:id", protectRoute, updateUser);
export default userRouter;
