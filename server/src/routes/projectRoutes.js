import express from "express";
import protect from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import upload from "../middleware/uploadMiddleware.js";
import projectValidator, {
  updateProjectValidator,
  publishValidator,
  featureValidator,
  orderValidator,
} from "../validators/projectValidator.js";
import { reorderValidator } from "../validators/commonValidators.js";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  uploadProjectCover,
  addProjectGallery,
  deleteProjectGalleryImage,
  togglePublish,
  toggleFeatured,
  updateProjectOrder,
  reorderProjects,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProject);

router.put("/reorder", protect, reorderValidator, validate, reorderProjects);

router.post("/", protect, projectValidator, validate, createProject);
router.put("/:id", protect, updateProjectValidator, validate, updateProject);
router.delete("/:id", protect, deleteProject);

router.patch("/:id/publish", protect, publishValidator, validate, togglePublish);
router.patch("/:id/feature", protect, featureValidator, validate, toggleFeatured);
router.patch("/:id/order", protect, orderValidator, validate, updateProjectOrder);

router.post(
  "/:id/cover",
  protect,
  upload.single("file"),
  uploadProjectCover
);

router.post(
  "/:id/gallery",
  protect,
  upload.array("files", 10),
  addProjectGallery
);

router.delete(
  "/:id/gallery/:imageId",
  protect,
  deleteProjectGalleryImage
);

export default router;
