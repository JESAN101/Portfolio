import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";
import { uploadLimiter } from "../middleware/rateLimiters.js";
import { uploadFile } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", protect, uploadLimiter, upload.single("file"), uploadFile);

export default router;
