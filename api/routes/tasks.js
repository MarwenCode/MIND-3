import express from "express";
import {createTask, getAllTasks,updateTask } from "../controllers/Tasks.js"

const tasksRoutes = express.Router();
tasksRoutes.post("/task", createTask)
tasksRoutes.get("/task", getAllTasks)
tasksRoutes.put("/task/:id", updateTask );


export default tasksRoutes
