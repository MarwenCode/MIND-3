import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import categoriesRoutes from "./routes/categories.js";
import tasksRoutes from "./routes/tasks.js";
import messageRoutes from "./routes/messages.js";
import http from 'http';
import initializeSocket from "./socket/socket.js";
import { Server } from 'socket.io';
import multer from "multer";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const app = express();
const server = http.createServer(app);
// const io = new Server(server);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173", // Update with your client's origin
    methods: ["GET", "POST"], // Add the allowed methods
    allowedHeaders: ["my-custom-header"], // Add any custom headers you want to allow
    credentials: true, // Set to true if you are using cookies or sessions
  },
});


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enable CORS
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });


// app.use(cors({ origin: 'http://127.0.0.1:5173' }));


// Upload files
app.use("/files", express.static(path.join(__dirname, "/files")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'files');
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

// Routes
app.get("/", (req, res) => {
  res.json("mySQL connected");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/messages", messageRoutes);

// Set up socket.io
initializeSocket(io);

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



