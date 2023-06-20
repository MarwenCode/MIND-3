import express from "express";
import { updateTaskAndMoveToInprogress, getTheInprogressTasks } from "../controllers/Inprogress.js";

const inprogressRoutes = express.Router();
inprogressRoutes.put("/:id", updateTaskAndMoveToInprogress);
inprogressRoutes.get("/", getTheInprogressTasks);

export default inprogressRoutes;

