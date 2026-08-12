import {
  getProfileService,
  createProfileService,
  updateProfileService,
  deleteProfileService,
  updateProfileImageService,
  removeProfileImageService,
  updateAboutImageService,
  removeAboutImageService,
} from "../services/profileService.js";
import { sendError } from "../utils/sendError.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await getProfileService();

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const createProfile = async (req, res) => {
  try {
    const profile = await createProfileService(req.body);

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await updateProfileService(req.body);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    return sendError(res, error);
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
    return sendError(res, error);
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

    const profile = await updateProfileImageService(req.file.path);

    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      data: profile,
    });
  } catch (error) {
    return sendError(res, error);
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
    return sendError(res, error);
  }
};

export const updateAboutImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const profile = await updateAboutImageService(req.file.path);

    return res.status(200).json({
      success: true,
      message: "About image updated successfully",
      data: profile,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const removeAboutImage = async (req, res) => {
  try {
    const profile = await removeAboutImageService();

    return res.status(200).json({
      success: true,
      message: "About image removed successfully",
      data: profile,
    });
  } catch (error) {
    return sendError(res, error);
  }
};
