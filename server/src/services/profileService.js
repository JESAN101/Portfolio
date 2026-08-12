import Profile from "../models/Profile.js";
import { AppError } from "../utils/AppError.js";
import {
  uploadAndCleanupLocalFile,
  deleteFromCloudinary,
} from "./cloudinaryService.js";

export const getProfileService = async () => {
  return await Profile.findOne();
};

export const createProfileService = async (data) => {
  const existingProfile = await Profile.findOne();

  if (existingProfile) {
    throw new AppError("Profile already exists", 409);
  }

  return await Profile.create(data);
};

export const updateProfileService = async (data) => {
  const profile = await Profile.findOne();

  if (!profile) {
    throw new AppError("Profile not found", 404);
  }

  Object.assign(profile, data);

  await profile.save();

  return profile;
};

export const deleteProfileService = async () => {
  const profile = await Profile.findOne();

  if (!profile) {
    throw new AppError("Profile not found", 404);
  }

  const publicIds = [profile.profileImagePublicId, profile.aboutImagePublicId].filter(Boolean);

  await profile.deleteOne();

  if (publicIds.length) {
    await Promise.all(publicIds.map((id) => deleteFromCloudinary(id)));
  }

  return true;
};

const updateImageService = async ({ field, publicIdField, filePath, folder }) => {
  const profile = await Profile.findOne();

  if (!profile) {
    throw new AppError("Profile not found", 404);
  }

  const uploaded = await uploadAndCleanupLocalFile(filePath, {
    folder,
    resource_type: "image",
  });

  const previousPublicId = profile[publicIdField];

  profile[field] = uploaded.url;
  profile[publicIdField] = uploaded.publicId;
  await profile.save();

  if (previousPublicId) {
    await deleteFromCloudinary(previousPublicId);
  }

  return profile;
};

export const updateProfileImageService = async (filePath) => {
  return updateImageService({
    field: "profileImage",
    publicIdField: "profileImagePublicId",
    filePath,
    folder: "portfolio/profile",
  });
};

export const updateAboutImageService = async (filePath) => {
  return updateImageService({
    field: "aboutImage",
    publicIdField: "aboutImagePublicId",
    filePath,
    folder: "portfolio/about",
  });
};

const removeImageService = async ({ field, publicIdField }) => {
  const profile = await Profile.findOne();

  if (!profile) {
    throw new AppError("Profile not found", 404);
  }

  const previousPublicId = profile[publicIdField];

  profile[field] = "";
  profile[publicIdField] = "";
  await profile.save();

  if (previousPublicId) {
    await deleteFromCloudinary(previousPublicId);
  }

  return profile;
};

export const removeProfileImageService = async () => {
  return removeImageService({
    field: "profileImage",
    publicIdField: "profileImagePublicId",
  });
};

export const removeAboutImageService = async () => {
  return removeImageService({
    field: "aboutImage",
    publicIdField: "aboutImagePublicId",
  });
};
