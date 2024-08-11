import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
import { addToBlacklist } from "../utils/blacklist.js";

env.config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Input validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ userId: user.id, name: user.name }, jwtSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const me = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  const user = await Users.findOne({
    attributes: ["id", "name", "email"],
    where: {
      id: req.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const id = user.id;
  const name = user.name;
  const email = user.email;
  res.status(200).json({ msg: "Authorized", id, name, email });
};

export const logout = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  if (token) {
    addToBlacklist(token);
    res.json({ message: "Logged out successfully" });
  } else {
    res.status(400).json({ message: "Token not provided" });
  }
};
