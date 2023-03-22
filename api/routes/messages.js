import express from "express";
import { createMessage, getAllMessages  } from "../controllers/Messages.js";

const messageRoutes = express.Router()

messageRoutes.post("/message", createMessage)
messageRoutes.get("/message", getAllMessages)


export default messageRoutes