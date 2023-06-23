import express from "express";
import { updateTaskAndMoveToInprogress, getTheInprogressTasks, getSingleInprogressTask } from "../controllers/Inprogress.js";

const inprogressRoutes = express.Router();
inprogressRoutes.put("/:id", updateTaskAndMoveToInprogress);
inprogressRoutes.get("/task/:id", getSingleInprogressTask);
// inprogressRoutes.get("/task/", getAllInprogressTasks);
inprogressRoutes.get("/", getTheInprogressTasks);

export default inprogressRoutes;

