import express from "express";
import { register, login, logout } from "../controllers/Auth.js";

const authRoutes = express.Router()

authRoutes.post("/login", login)
authRoutes.post("/register", register)
authRoutes.post("/logout", logout)


export default authRoutes