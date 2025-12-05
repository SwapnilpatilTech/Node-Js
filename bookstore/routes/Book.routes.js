import express from "express";

import { addBook, deleteData, getAllData, getDataById, updateData } from "../controllers/Book.controller.js";

const router = express.Router();
 
router.post("/", addBook);
router.get("/", getAllData);
router.get("/:id", getDataById);
router.patch("/:id", updateData);
router.delete("/:id", deleteData);

export default router;
