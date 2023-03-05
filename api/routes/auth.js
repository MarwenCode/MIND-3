import express from "express";
import { register } from "../controllers/Auth.js";

const authRoutes = express.Router()

// router.post("/login", login)
authRoutes.post("/register", register)
// router.post("/logout", logout)


export default authRoutes