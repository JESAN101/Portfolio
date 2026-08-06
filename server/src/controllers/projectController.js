import {
  createProjectService,
  getProjectsService,
  getProjectService,
  updateProjectService,
  deleteProjectService,
  uploadProjectCoverService,
  addProjectGalleryService,
  deleteProjectGalleryImageService,
  setPublishStatusService,
  setFeaturedStatusService,
  updateProjectOrderService,
  reorderProjectsService,
} from "../services/projectService.js";
import { sendError } from "../utils/sendError.js";
import { removeLocalFile } from "../utils/fileUtils.js";

export const createProject = async (req, res) => {
  try {
    const project = await createProjectService(req.body);

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const getProjects = async (req, res) => {
  try {
    const { data, pagination } = await getProjectsService(req.query);

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

export const getProject = async (req, res) => {
  try {
    const project = await getProjectService(req.params.id);

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await updateProjectService(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const deleteProject = async (req, res) => {
  try {
    await deleteProjectService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const uploadProjectCover = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const project = await uploadProjectCoverService(req.params.id, req.file.path);

    removeLocalFile(req.file.path);

    return res.status(200).json({
      success: true,
      message: "Cover image updated successfully",
      data: project,
    });
  } catch (error) {
    removeLocalFile(req.file?.path);

    return sendError(res, error);
  }
};

export const addProjectGallery = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded",
      });
    }

    const project = await addProjectGalleryService(req.params.id, req.files);

    req.files.forEach((file) => removeLocalFile(file.path));

    return res.status(200).json({
      success: true,
      message: "Gallery images added successfully",
      data: project,
    });
  } catch (error) {
    (req.files || []).forEach((file) => removeLocalFile(file.path));

    return sendError(res, error);
  }
};

export const deleteProjectGalleryImage = async (req, res) => {
  try {
    const project = await deleteProjectGalleryImageService(
      req.params.id,
      req.params.imageId
    );

    return res.status(200).json({
      success: true,
      message: "Gallery image deleted successfully",
      data: project,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const togglePublish = async (req, res) => {
  try {
    const project = await setPublishStatusService(
      req.params.id,
      req.body.published
    );

    return res.status(200).json({
      success: true,
      message: `Project ${req.body.published ? "published" : "unpublished"} successfully`,
      data: project,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const toggleFeatured = async (req, res) => {
  try {
    const project = await setFeaturedStatusService(
      req.params.id,
      req.body.featured
    );

    return res.status(200).json({
      success: true,
      message: `Project ${req.body.featured ? "featured" : "unfeatured"} successfully`,
      data: project,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const updateProjectOrder = async (req, res) => {
  try {
    const project = await updateProjectOrderService(
      req.params.id,
      req.body.order
    );

    return res.status(200).json({
      success: true,
      message: "Project order updated successfully",
      data: project,
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const reorderProjects = async (req, res) => {
  try {
    const projects = await reorderProjectsService(req.body.items);

    return res.status(200).json({
      success: true,
      message: "Project order updated successfully",
      data: projects,
    });
  } catch (error) {
    return sendError(res, error);
  }
};
