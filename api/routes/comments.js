import express from "express";
// import {createComment, getSingleComment, getAllComments} from "../controllers/Comments.js";
import {createComment, getAllComments } from "../controllers/Comments.js";

const commentsRoutes = express.Router();

commentsRoutes.post("/", createComment);
commentsRoutes.get("/allcomments", getAllComments);


export default commentsRoutes