import express from "express";
import {
  followUnFollowUser,
  getUserProfile,
  loginUser,
  logoutuser,
  signupUser,
  updateUser,
} from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";
const userRouter = express.Router();
userRouter.get("/getprofile/:username", getUserProfile);
userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", protectRoute, logoutuser);
userRouter.post("/follow/:id", protectRoute, followUnFollowUser);
userRouter.patch("/update/:id", protectRoute, updateUser);
export default userRouter;