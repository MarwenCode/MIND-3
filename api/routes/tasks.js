import express from "express";
import {createTask, getAllTasks,updateTask, getSingleTask, deleteTask, updateTaskStatusAndAssignee } from "../controllers/Tasks.js"

const tasksRoutes = express.Router();
tasksRoutes.post("/task", createTask);
tasksRoutes.get("/task", getAllTasks);
tasksRoutes.put("/task/:id", updateTask );
tasksRoutes.put("/task/:id", updateTaskStatusAndAssignee );
tasksRoutes.get("/task/:id", getSingleTask );
tasksRoutes.delete("/task/:id", deleteTask );


export default tasksRoutes
