import express from "express";
import {createTask, getAllTasks,updateTask, getSingleTask } from "../controllers/Tasks.js"

const tasksRoutes = express.Router();
tasksRoutes.post("/task", createTask);
tasksRoutes.get("/task", getAllTasks);
tasksRoutes.put("/task/:id", updateTask );
tasksRoutes.get("/task/:id", getSingleTask );


export default tasksRoutes
