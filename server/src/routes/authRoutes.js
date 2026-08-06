import express from "express";
import { login, getMe, updatePassword } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import { authLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();

router.post("/login", authLimiter, login);
router.get("/me", protect, getMe);
router.put("/password", protect, updatePassword); // NEW — used by Settings.jsx

export default router;