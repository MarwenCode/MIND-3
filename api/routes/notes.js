import express from "express";
import { createNote, getAllNotes,updateNote,deleteNote } from "../controllers/Notes.js";

const notesRoutes = express.Router()
notesRoutes.post("/note", createNote);
notesRoutes.put("/note/:id", updateNote );
notesRoutes.get("/note", getAllNotes);
notesRoutes.delete("/note/:id", deleteNote);

export default notesRoutes
