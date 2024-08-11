import express from "express";
import {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
  filterByCategory,
  getPublishedPosts,
  getDraftPosts,
  paginatePosts,
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/posts/search", searchPost);
router.get("/posts", paginatePosts);
router.get("/posts/filter", filterByCategory);
router.get("/posts/publish", getPublishedPosts);
router.get("/posts", authMiddleware, getPosts);
router.get("/posts/draft", authMiddleware, getDraftPosts);
router.post("/posts", authMiddleware, createPost);
router.get("/posts/:id", authMiddleware, getPostById);
router.delete("/posts/:id", authMiddleware, deletePost);
router.put("/posts/:id", authMiddleware, updatePost);

export default router;
