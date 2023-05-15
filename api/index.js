

import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import categoriesRoutes from "./routes/categories.js";
import tasksRoutes from "./routes/tasks.js";
import messageRoutes from "./routes/messages.js";
import { Server } from 'socket.io';
import http from 'http';
import initializeSocket from "./socket.js";

const app = express();
// app.use(cors());
const server = http.createServer(app);

dotenv.config();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
  next();
});



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use("/api", cors({
  origin: "http://localhost:8000",
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization"
}));

app.options("*", cors({ allowedHeaders: ["Content-Type"] }));


app.use("/api", cors({
  origin: "http://localhost:8000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});




// app.use(cors());

app.get("/", (req, res) => {
  res.json("mySQL connected");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/messages", messageRoutes);


app.use(cors({
  origin:"*"
}))





const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

initializeSocket(server);




