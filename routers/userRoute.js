import express from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { login, logout, me } from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//user
router.get("/users", authMiddleware, getUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

//auth
router.post("/register", createUser);
router.post("/login", login);
router.get("/me", authMiddleware, me);
router.delete("/logout", authMiddleware, logout);

export default router;
