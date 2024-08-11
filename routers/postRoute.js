import express from "express";
import {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/posts", getPosts);
router.get("/posts/search", searchPost);
router.post("/posts", authMiddleware, createPost);
router.get("/posts/:id", authMiddleware, getPostById);
router.delete("/posts/:id", authMiddleware, deletePost);
router.put("/posts/:id", authMiddleware, updatePost);

export default router;
