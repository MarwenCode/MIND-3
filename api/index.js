import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import categoriesRoutes from "./routes/categories.js";
import tasksRoutes from "./routes/tasks.js";
import messageRoutes from "./routes/messages.js";
import { initializeSocket } from './socket.js';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.options("*", cors({ allowedHeaders: ["Content-Type"] }));

app.get("/", (req, res) => {
  res.json("mySQL connected");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

initializeSocket(server);

