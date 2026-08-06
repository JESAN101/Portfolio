import express from "express";
import protect from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import { reorderValidator } from "../validators/commonValidators.js";
import {
  educationValidator,
  updateEducationValidator,
} from "../validators/educationValidator.js";
import {
  createEducation,
  getEducations,
  getEducation,
  updateEducation,
  deleteEducation,
  reorderEducations,
} from "../controllers/educationController.js";

const router = express.Router();

router.get("/", getEducations);
router.get("/:id", getEducation);

router.put("/reorder", protect, reorderValidator, validate, reorderEducations);

router.post("/", protect, educationValidator, validate, createEducation);
router.put("/:id", protect, updateEducationValidator, validate, updateEducation);
router.delete("/:id", protect, deleteEducation);

export default router;
