import express from "express";
import protect from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import { reorderValidator } from "../validators/commonValidators.js";
import {
  experienceValidator,
  updateExperienceValidator,
} from "../validators/experienceValidator.js";
import {
  createExperience,
  getExperiences,
  getExperience,
  updateExperience,
  deleteExperience,
  reorderExperiences,
} from "../controllers/experienceController.js";

const router = express.Router();

router.get("/", getExperiences);
router.get("/:id", getExperience);

router.put("/reorder", protect, reorderValidator, validate, reorderExperiences);

router.post("/", protect, experienceValidator, validate, createExperience);
router.put("/:id", protect, updateExperienceValidator, validate, updateExperience);
router.delete("/:id", protect, deleteExperience);

export default router;
