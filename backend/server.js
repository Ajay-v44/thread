import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connectDB.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes

app.use("/api/users",userRouter)
app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
