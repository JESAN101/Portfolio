import express from "express";
import protect from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import upload from "../middleware/uploadMiddleware.js";
import { reorderValidator } from "../validators/commonValidators.js";
import {
  skillValidator,
  updateSkillValidator,
} from "../validators/skillValidator.js";
import {
  createSkill,
  getSkills,
  getSkill,
  updateSkill,
  deleteSkill,
  uploadSkillIcon,
  reorderSkills,
} from "../controllers/skillController.js";

const router = express.Router();

router.get("/", getSkills);
router.get("/:id", getSkill);

router.put("/reorder", protect, reorderValidator, validate, reorderSkills);

router.post("/", protect, skillValidator, validate, createSkill);
router.put("/:id", protect, updateSkillValidator, validate, updateSkill);
router.delete("/:id", protect, deleteSkill);

router.post(
  "/:id/icon",
  protect,
  upload.single("file"),
  uploadSkillIcon
);

export default router;
