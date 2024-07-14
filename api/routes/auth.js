import express from "express";
import { register } from "../controllers/auth.js";
import { login } from "../controllers/auth.js"
const router = express.Router();

// register
router.post("/register", register)
// login
router.post("/login", login)


export default router