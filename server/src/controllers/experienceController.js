import {
  createExperienceService,
  getExperiencesService,
  getExperienceService,
  updateExperienceService,
  deleteExperienceService,
  reorderExperiencesService,
} from "../services/experienceService.js";
import { sendError } from "../utils/sendError.js";

export const createExperience = async (req, res) => {
  try {
    const experience = await createExperienceService(req.body);

    return res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: experience,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const getExperiences = async (req, res) => {
  try {
    const { data, pagination } = await getExperiencesService(req.query);

    return res.status(200).json({
      success: true,
      count: data.length,
      pagination,
      data,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const getExperience = async (req, res) => {
  try {
    const experience = await getExperienceService(req.params.id);

    return res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const updateExperience = async (req, res) => {
  try {
    const experience = await updateExperienceService(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const deleteExperience = async (req, res) => {
  try {
    await deleteExperienceService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const reorderExperiences = async (req, res) => {
  try {
    const experiences = await reorderExperiencesService(req.body.items);

    return res.status(200).json({
      success: true,
      message: "Experience order updated successfully",
      data: experiences,
    });
  } catch (error) {
    return sendError(res, error);
  }
};
