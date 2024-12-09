import express from "express";
const router = express.Router();
import { loginUser, signupUser } from "../controllers/userController.js";
  
// login route
router.post("/login", loginUser);
  
// signup route
router.post("/signup", signupUser);
  
export default router;