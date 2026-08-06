import slugify from "slugify";
import Project from "../models/Project.js";
import { AppError } from "../utils/AppError.js";
import { paginate } from "../utils/queryBuilder.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  deleteMultipleFromCloudinary,
} from "./cloudinaryService.js";

const SEARCHABLE = ["title", "shortDescription", "description", "technologies"];
const FILTERABLE = ["category", "featured", "published"];
const BOOLEAN_FIELDS = ["featured", "published"];
const SORTABLE = {
  createdAt: 1,
  updatedAt: 1,
  title: 1,
  order: 1,
};

const generateUniqueSlug = async (title, projectId = null) => {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await Project.findOne({ slug });

    if (!existing) return slug;

    if (projectId && existing._id.toString() === projectId.toString()) {
      return slug;
    }

    slug = `${baseSlug}-${counter++}`;
  }
};

export const createProjectService = async (data) => {
  data.slug = await generateUniqueSlug(data.title);

  return Project.create(data);
};

export const getProjectsService = async (query = {}) => {
  return paginate(Project, query, {
    searchable: SEARCHABLE,
    filterable: FILTERABLE,
    booleanFields: BOOLEAN_FIELDS,
    sortable: SORTABLE,
  });
};

export const getProjectService = async (id) => {
  const project = await Project.findById(id);

  if (!project) throw new AppError("Project not found", 404);

  return project;
};

export const updateProjectService = async (id, data) => {
  if (data.title) {
    data.slug = await generateUniqueSlug(data.title, id);
  }

  const project = await Project.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!project) throw new AppError("Project not found", 404);

  return project;
};

export const deleteProjectService = async (id) => {
  const project = await Project.findByIdAndDelete(id);

  if (!project) throw new AppError("Project not found", 404);

  const publicIds = [
    project.coverPublicId,
    ...(project.galleryImages || []).map((image) => image.publicId),
  ].filter(Boolean);

  await deleteMultipleFromCloudinary(publicIds);

  return project;
};

export const uploadProjectCoverService = async (id, filePath) => {
  const project = await Project.findById(id);

  if (!project) throw new AppError("Project not found", 404);

  const uploaded = await uploadToCloudinary(filePath, {
    folder: "portfolio/projects/covers",
    resource_type: "image",
  });

  const previousPublicId = project.coverPublicId;

  project.coverImage = uploaded.url;
  project.coverPublicId = uploaded.publicId;
  await project.save();

  if (previousPublicId) {
    await deleteFromCloudinary(previousPublicId);
  }

  return project;
};

export const addProjectGalleryService = async (id, files = []) => {
  const project = await Project.findById(id);

  if (!project) throw new AppError("Project not found", 404);

  const uploaded = [];

  try {
    for (const file of files) {
      const result = await uploadToCloudinary(file.path, {
        folder: "portfolio/projects/gallery",
        resource_type: "image",
      });

      uploaded.push(result);
    }
  } catch (error) {
    await deleteMultipleFromCloudinary(uploaded.map((item) => item.publicId));

    throw error;
  }

  project.galleryImages.push(...uploaded);
  await project.save();

  return project;
};

export const deleteProjectGalleryImageService = async (id, imageId) => {
  const project = await Project.findById(id);

  if (!project) throw new AppError("Project not found", 404);

  const image = (project.galleryImages || []).find(
    (item) => item._id.toString() === imageId
  );

  if (!image) throw new AppError("Gallery image not found", 404);

  project.galleryImages = project.galleryImages.filter(
    (item) => item._id.toString() !== imageId
  );
  await project.save();

  if (image.publicId) {
    await deleteFromCloudinary(image.publicId);
  }

  return project;
};

export const setPublishStatusService = async (id, published) => {
  const project = await Project.findByIdAndUpdate(
    id,
    { published },
    { returnDocument: "after", runValidators: true }
  );

  if (!project) throw new AppError("Project not found", 404);

  return project;
};

export const setFeaturedStatusService = async (id, featured) => {
  const project = await Project.findByIdAndUpdate(
    id,
    { featured },
    { returnDocument: "after", runValidators: true }
  );

  if (!project) throw new AppError("Project not found", 404);

  return project;
};

export const updateProjectOrderService = async (id, order) => {
  const project = await Project.findByIdAndUpdate(
    id,
    { order },
    { returnDocument: "after", runValidators: true }
  );

  if (!project) throw new AppError("Project not found", 404);

  return project;
};

export const reorderProjectsService = async (items = []) => {
  const operations = items.map((item) => ({
    updateOne: {
      filter: { _id: item.id },
      update: { $set: { order: item.order } },
    },
  }));

  if (operations.length) {
    await Project.bulkWrite(operations);
  }

  return Project.find().sort({ order: 1, createdAt: 1 });
};
