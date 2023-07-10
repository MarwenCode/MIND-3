import express from "express";
import {
  updateTaskAndMoveToInprogress,
  getTheInprogressTasks,
  getSingleInprogressTask,
  updateTaskInProgress,
  deleteTask,
} from "../controllers/Inprogress.js";

const inprogressRoutes = express.Router();
inprogressRoutes.put("/:id", updateTaskAndMoveToInprogress);
inprogressRoutes.get("/task/:id", getSingleInprogressTask);
inprogressRoutes.put("/task/:id", updateTaskInProgress);
inprogressRoutes.delete("/task/:id", deleteTask);
// inprogressRoutes.get("/task/", getAllInprogressTasks);
inprogressRoutes.get("/", getTheInprogressTasks);

export default inprogressRoutes;
