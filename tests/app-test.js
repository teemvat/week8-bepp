import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoTaskRouter from "../routers/todoTaskRouter.js";
import userRouter from "../routers/userRouter.js";
import tourRouter from "../routers/tourRouter.js";
import {
  unknownEndpoint,
  errorHandler,
} from "../middleware/customMiddleware.js";

// express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use("/api/todoTasks", todoTaskRouter);
app.use("/api/users", userRouter);
app.use("/api/tours", tourRouter);

app.use(unknownEndpoint);
app.use(errorHandler);


mongoose
  .connect("mongodb://localhost:27017/test-db")
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.error(error);
  });

  export default app;