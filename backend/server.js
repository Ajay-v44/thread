import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connectDB.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRouter.js";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes

app.use("/api/users", userRouter);
app.use("/api/post", postRouter);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
