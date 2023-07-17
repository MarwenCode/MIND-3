import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import categoriesRoutes from "./routes/categories.js";
import tasksRoutes from "./routes/tasks.js";
import inprogressRoutes from "./routes/inprogress.js";
import messageRoutes from "./routes/messages.js";
import commentsRoutes from "./routes/comments.js";
import http from "http";
import initializeSocket from "./socket/socket.js";
import { Server } from "socket.io";
import multer from "multer";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server);

// const io = new Server(server, {
//   cors: {
//     origin: "http://127.0.0.1:5173", // Update with your client's origin
//     methods: ["GET", "POST"], // Add the allowed methods
//     allowedHeaders: ["my-custom-header"], // Add any custom headers you want to allow
//     credentials: true, // Set to true if you are using cookies or sessions
//   },
// });

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enable CORS
app.use(cors());

// Upload files
app.use("/files", express.static(path.join(__dirname, "/files")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "files");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  console.error(req.file);
  console.error(req.body);

  // Construct the file URL
  const fileUrl = `http://localhost:8000/files/${req.file.filename}`;

  // Return the file URL in the response
  res.status(200).json({ fileUrl });
});

// Middleware
app.use(express.json());

// Set up Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle socket events here
  // For example, you can listen for a "message" event and broadcast it to all connected clients

  socket.on("message", (data) => {
    console.log("Received message:", data);
    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Routes
app.get("/", (req, res) => {
  res.json("mySQL connected");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/inprogress", inprogressRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/comments", commentsRoutes);

// Set up socket.io
// initializeSocket(io);

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
