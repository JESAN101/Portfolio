import {
  createEducationService,
  getEducationsService,
  getEducationService,
  updateEducationService,
  deleteEducationService,
  reorderEducationsService,
} from "../services/educationService.js";
import { sendError } from "../utils/sendError.js";

export const createEducation = async (req, res) => {
  try {
    const education = await createEducationService(req.body);

    return res.status(201).json({
      success: true,
      message: "Education created successfully",
      data: education,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const getEducations = async (req, res) => {
  try {
    const { data, pagination } = await getEducationsService(req.query);

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

export const getEducation = async (req, res) => {
  try {
    const education = await getEducationService(req.params.id);

    return res.status(200).json({
      success: true,
      data: education,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const updateEducation = async (req, res) => {
  try {
    const education = await updateEducationService(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Education updated successfully",
      data: education,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const deleteEducation = async (req, res) => {
  try {
    await deleteEducationService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const reorderEducations = async (req, res) => {
  try {
    const education = await reorderEducationsService(req.body.items);

    return res.status(200).json({
      success: true,
      message: "Education order updated successfully",
      data: education,
    });
  } catch (error) {
    return sendError(res, error);
  }
};
