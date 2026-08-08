import { validationResult } from "express-validator";
import {
  getProfileService,
  createProfileService,
  updateProfileService,
  deleteProfileService,
  updateProfileImageService,
  removeProfileImageService,
} from "../services/profileService.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await getProfileService();

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeProfileImage = async (req, res) => {
  try {
    const profile = await removeProfileImageService();

    return res.status(200).json({
      success: true,
      message: "Profile image removed successfully",
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createProfile = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const profile = await createProfileService(req.body);

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const profile = await updateProfileService(req.body);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    await deleteProfileService();

    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "portfolio/profile",
      resource_type: "image",
    });

    fs.unlinkSync(req.file.path);

    const profile = await updateProfileImageService(result.secure_url);

    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      data: profile,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};