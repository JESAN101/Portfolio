import express from "express";
import { login, getMe, updatePassword } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import { authLimiter } from "../middleware/rateLimiters.js";
import { loginValidator, updatePasswordValidator } from "../validators/authValidator.js";

const router = express.Router();

router.post("/login", authLimiter, loginValidator, validate, login);
router.get("/me", protect, getMe);
router.put("/password", protect, updatePasswordValidator, validate, updatePassword);

export default router;
