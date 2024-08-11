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
router.post("/category", createCategory);
router.get("/category/:id", getCategoryById);
router.delete("/category/:id", deleteCategory);
router.put("/category/:id", updateCategory);

export default router;
