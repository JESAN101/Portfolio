import {
  createSkillService,
  getSkillsService,
  getSkillService,
  updateSkillService,
  deleteSkillService,
  uploadSkillIconService,
  reorderSkillsService,
} from "../services/skillService.js";
import { sendError } from "../utils/sendError.js";
import { removeLocalFile } from "../utils/fileUtils.js";

export const createSkill = async (req, res) => {
  try {
    const skill = await createSkillService(req.body);

    return res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const getSkills = async (req, res) => {
  try {
    const { data, pagination } = await getSkillsService(req.query);

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

export const getSkill = async (req, res) => {
  try {
    const skill = await getSkillService(req.params.id);

    return res.status(200).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await updateSkillService(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const deleteSkill = async (req, res) => {
  try {
    await deleteSkillService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const uploadSkillIcon = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const skill = await uploadSkillIconService(req.params.id, req.file.path);

    removeLocalFile(req.file.path);

    return res.status(200).json({
      success: true,
      message: "Skill icon updated successfully",
      data: skill,
    });
  } catch (error) {
    removeLocalFile(req.file?.path);

    return sendError(res, error);
  }
};

export const reorderSkills = async (req, res) => {
  try {
    const skills = await reorderSkillsService(req.body.items);

    return res.status(200).json({
      success: true,
      message: "Skill order updated successfully",
      data: skills,
    });
  } catch (error) {
    return sendError(res, error);
  }
};
