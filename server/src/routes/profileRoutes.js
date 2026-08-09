import express from "express";
import {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  updateProfileImage,
  removeProfileImage,
  updateAboutImage,
  removeAboutImage,
} from "../controllers/profileController.js";

import protect from "../middleware/authMiddleware.js";
import { profileValidator } from "../validators/profileValidator.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/*
Public Route
*/
router.get("/", getProfile);

/*
Protected Routes
*/
router.post("/", protect, profileValidator, createProfile);

router.put("/", protect, profileValidator, updateProfile);

router.put(
  "/image",
  protect,
  upload.single("file"),
  updateProfileImage
);

router.delete("/image", protect, removeProfileImage);

router.put(
  "/about-image",
  protect,
  upload.single("file"),
  updateAboutImage
);

router.delete("/about-image", protect, removeAboutImage);

router.delete("/", protect, deleteProfile);

export default router;