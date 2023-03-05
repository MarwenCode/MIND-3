import express from "express";
import { createNote, getAllNotes } from "../controllers/Notes.js";

const notesRoutes = express.Router()
notesRoutes.post("/note", createNote);
notesRoutes.get("/note", getAllNotes);

export default notesRoutes
