import express from "express";
import mysql from "mysql"
import dotenv from "dotenv";
import cors from "cors";
// import morgan from "morgan"
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js"
import catergoriesRoutes from "./routes/categories.js";

const app = express();
dotenv.config();
const passWord = process.env.passWord


// Log HTTP requests and responses
// app.use(morgan('dev'));

app.use(express.json())
app.use(cors())



app.get("/", (req,res) => {
    res.json("mySQL connected")
})

app.use(express.json())

app.use(cors())


app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/categories", catergoriesRoutes)


app.listen(8000, () => {
    console.log("connected to backend")
})