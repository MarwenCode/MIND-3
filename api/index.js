// import express from "express";
// import mysql from "mysql";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRoutes from "./routes/auth.js";
// import notesRoutes from "./routes/notes.js";
// import categoriesRoutes from "./routes/categories.js";
// import tasksRoutes from "./routes/tasks.js";
// import messageRoutes from "./routes/messages.js";
// import { Server } from 'socket.io';
// import http from 'http';
// import initializeSocket from "./socket.js";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";

// const app = express();
// // app.use(cors());
// const server = http.createServer(app);

// app.use(cors());
// app.use(express.json());

// dotenv.config();


// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);
// console.log("files", __dirname);



// //upload files

// app.use("/files", express.static(path.join(__dirname, "/files")));
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, "files");
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });


// const upload = multer({ storage: storage });

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   console.error(req.file);
//   console.error(req.body);

//   res.status(200).json("File has been uploaded");
// });








// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
//   next();
// });



// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// app.use("/api", cors({
//   origin: "http://localhost:8000",
//   methods: "GET,POST",
//   allowedHeaders: "Content-Type,Authorization"
// }));

// app.options("*", cors({ allowedHeaders: ["Content-Type"] }));


// app.use("/api", cors({
//   origin: "http://localhost:8000",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));


// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });




// // app.use(cors());

// app.get("/", (req, res) => {
//   res.json("mySQL connected");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/notes", notesRoutes);
// app.use("/api/categories", categoriesRoutes);
// app.use("/api/tasks", tasksRoutes);
// app.use("/api/messages", messageRoutes);


// app.use(cors({
//   origin:"*"
// }))





// const PORT = process.env.PORT || 8000;

// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// initializeSocket(server);












/////////////////////////////////////////////////////////////

// import express from "express";
// import mysql from "mysql";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRoutes from "./routes/auth.js";
// import notesRoutes from "./routes/notes.js";
// import categoriesRoutes from "./routes/categories.js";
// import tasksRoutes from "./routes/tasks.js";
// import messageRoutes from "./routes/messages.js";
// import { Server } from 'socket.io';
// import http from 'http';
// import initializeSocket from "./socket.js";
// import multer from "multer";
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';


// // ... import statements ...

// const app = express();
// const server = http.createServer(app);

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// console.log("files", __dirname);

// // Upload files
// app.use("/files", express.static(path.join(__dirname, "/files")));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, 'files');
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });


// const upload = multer({ storage: storage });

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   console.error(req.file);
//   console.error(req.body);

//    // Construct the file URL
//   const fileUrl = `http://localhost:8000/files/${req.file.filename}`;

//   // Return the file URL in the response
//   res.status(200).json({ fileUrl });

//   res.status(200).json("File has been uploaded");
// });




// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
//   next();
// });



// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// app.use("/api", cors({
//   origin: "http://localhost:8000",
//   methods: "GET,POST",
//   allowedHeaders: "Content-Type,Authorization"
// }));

// app.options("*", cors({ allowedHeaders: ["Content-Type"] }));


// app.use("/api", cors({
//   origin: "http://localhost:8000",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));


// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });




// // Middleware
// app.use(cors());
// app.use(express.json());

// // ... other middleware and routes ...


// app.get("/", (req, res) => {
//   res.json("mySQL connected");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/notes", notesRoutes);
// app.use("/api/categories", categoriesRoutes);
// app.use("/api/tasks", tasksRoutes);
// app.use("/api/messages", messageRoutes);

// // Start the server
// const PORT = process.env.PORT || 8000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// initializeSocket(server);

///////////////////////333333333333333333/////////////////////////


import express from "express";
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
import multer from "multer";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const app = express();
const server = http.createServer(app);

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enable CORS
app.use(cors());

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

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

initializeSocket(server);
