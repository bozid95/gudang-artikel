import express from "express";
import { getPosts } from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/posts", getPosts);
router.post("/posts");
router.get("/posts/:id");
router.delete("/posts/:id");
router.put("/posts/:id");

export default router;
