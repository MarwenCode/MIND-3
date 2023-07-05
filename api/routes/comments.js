import express from "express";
// import {createComment, getSingleComment, getAllComments} from "../controllers/Comments.js";
import {createComment, getAllComments,getCommentsByTaskId } from "../controllers/Comments.js";

const commentsRoutes = express.Router();

commentsRoutes.post("/", createComment);
commentsRoutes.get("/allcomments", getAllComments);
commentsRoutes.get("/taskId/:id", getCommentsByTaskId);


export default commentsRoutes