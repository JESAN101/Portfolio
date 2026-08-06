import cloudinary from "../config/cloudinary.js";
import { removeLocalFile } from "../utils/fileUtils.js";

export const uploadToCloudinary = async (filePath, options = {}) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "portfolio",
    resource_type: "auto",
    ...options,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;

  return cloudinary.uploader.destroy(publicId);
};

export const deleteMultipleFromCloudinary = async (publicIds = []) => {
  const ids = publicIds.filter(Boolean);

  return Promise.all(ids.map((id) => deleteFromCloudinary(id)));
};

export const uploadAndCleanupLocalFile = async (filePath, options = {}) => {
  try {
    return await uploadToCloudinary(filePath, options);
  } finally {
    removeLocalFile(filePath);
  }
};
