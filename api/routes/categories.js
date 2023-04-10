import express from "express";
import { createCategory,getAllCategries, deleteCategory } from "../controllers/Catergories.js"

const catergoriesRoutes = express.Router();
catergoriesRoutes.post("/categorie", createCategory);
catergoriesRoutes.get("/categorie", getAllCategries);
catergoriesRoutes.delete("/categorie/:id", deleteCategory);


export default catergoriesRoutes