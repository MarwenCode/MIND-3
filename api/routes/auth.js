import express from "express";
import { register, login } from "../controllers/Auth.js";

const authRoutes = express.Router()

authRoutes.post("/login", login)
authRoutes.post("/register", register)
// router.post("/logout", logout)


export default authRoutes