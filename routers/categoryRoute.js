import express from "express";
import {
  getCategory,
  createCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/category", authMiddleware, getCategory);
router.post("/category", authMiddleware, createCategory);
router.get("/category/:id", authMiddleware, getCategoryById);
router.delete("/category/:id", authMiddleware, deleteCategory);
router.put("/category/:id", authMiddleware, updateCategory);

export default router;
