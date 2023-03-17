import express from "express";
import { createCategory,getAllCategries } from "../controllers/Catergories.js"

const catergoriesRoutes = express.Router();
catergoriesRoutes.post("/categorie", createCategory);
catergoriesRoutes.get("/categorie", getAllCategries);


export default catergoriesRoutes