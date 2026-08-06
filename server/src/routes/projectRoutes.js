import express from "express";
import protect from "../middleware/authMiddleware.js";
import projectValidator from "../validators/projectValidator.js";
import validate from "../middleware/validate.js";

import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProject);

router.post(
  "/",
  protect,
  projectValidator,
  validate,
  createProject
);

router.put(
  "/:id",
  protect,
  projectValidator,
  validate,
  updateProject
);

router.delete("/:id", protect, deleteProject);

export default router;