import express from "express";
import {createTask, getAllTasks } from "../controllers/Tasks.js"

const tasksRoutes = express.Router();
tasksRoutes.post("/task", createTask)
tasksRoutes.get("/task", getAllTasks)


export default tasksRoutes
