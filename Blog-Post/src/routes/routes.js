import express from "express";
import { authenticate, optionalAuth } from "../middleware/auth.js";
import { signup, login, logout, getCurrentUser } from "../controllers/authController.js";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} from "../controllers/blogController.js";

export const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.post("/auth/logout", authenticate, logout);
router.get("/auth/me", authenticate, getCurrentUser);

router.get("/blogs", optionalAuth, getAllBlogs);

router.get("/blogs/:id", getBlogById);

router.post("/blogs", authenticate, createBlog);

router.put("/blogs/:id", authenticate, updateBlog);

router.delete("/blogs/:id", authenticate, deleteBlog);

router.get("/", (req, res) => {
  res.send("Welcome to the Blog Post API");
});
