import Profile from "../models/Profile.js";

export const getProfileService = async () => {
  return await Profile.findOne();
};

export const createProfileService = async (data) => {
  const existingProfile = await Profile.findOne();

  if (existingProfile) {
    throw new Error("Profile already exists");
  }

  return await Profile.create(data);
};

export const updateProfileService = async (data) => {
  const profile = await Profile.findOne();

  if (!profile) {
    throw new Error("Profile not found");
  }

  Object.assign(profile, data);

  await profile.save();

  return profile;
};

export const deleteProfileService = async () => {
  const profile = await Profile.findOne();

  if (!profile) {
    throw new Error("Profile not found");
  }

  await profile.deleteOne();

  return true;
};

export const updateProfileImageService = async (imageUrl) => {
  const profile = await Profile.findOne();

  if (!profile) {
    throw new Error("Profile not found");
  }

  profile.profileImage = imageUrl;

  await profile.save();

  return profile;
};

export const removeProfileImageService = async () => {
  const profile = await Profile.findOne();

  if (!profile) {
    throw new Error("Profile not found");
  }

  profile.profileImage = "";

  await profile.save();

  return profile;
};