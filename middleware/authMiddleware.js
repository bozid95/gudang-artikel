import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { isBlacklisted } from "../utils/blacklist.js";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "Authorization token is missing or invalid" });
  }

  const token = authHeader.split(" ")[1];
  if (isBlacklisted(token)) {
    return res.status(403).json({ message: "Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId; // Add the user ID to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
