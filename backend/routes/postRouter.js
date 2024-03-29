import express from "express";
import {
  createPost,
  deletePost,
  getFeedPost,
  getPost,
  likeUnlikePost,
  replyToPost,
} from "../controllers/postController.js";
import protectRoute from "../middleware/protectRoute.js";

const postRouter = express.Router();

postRouter.post("/create", protectRoute, createPost);
postRouter.get("/getpost/:id", protectRoute, getPost);
postRouter.delete("/delete/:id", protectRoute, deletePost);
postRouter.post("/like/:id", protectRoute, likeUnlikePost);
postRouter.post("/reply/:id", protectRoute, replyToPost);
postRouter.get("/feed", protectRoute, getFeedPost);

export default postRouter;
