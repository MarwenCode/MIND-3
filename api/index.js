import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import cors from "cors";
// import morgan from "morgan"
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import catergoriesRoutes from "./routes/categories.js";
import tasksRoutes from "./routes/tasks.js";




const app = express();


dotenv.config();
const passWord = process.env.passWord;

// Log HTTP requests and responses
// app.use(morgan('dev'));

app.use(express.json());

// enable CORS requests
app.use(cors());

// include the necessary headers for CORS requests with Content-Type header
app.options(
  "*",
  cors({
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  res.json("mySQL connected");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/categories", catergoriesRoutes);
app.use("/api/tasks", tasksRoutes);



app.listen(8000, () => {
  console.log("connected to backend");
});


//socket io: 

import { initializeSocket } from './socket.js';


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

initializeSocket(server);
