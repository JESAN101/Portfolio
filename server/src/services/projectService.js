import slugify from "slugify";
import Project from "../models/Project.js";

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

  return await Project.create(data);
};

export const getProjectsService = async () => {
  return await Project.find().sort({
    order: 1,
    createdAt: -1,
  });
};

export const getProjectService = async (id) => {
  return await Project.findById(id);
};

export const updateProjectService = async (id, data) => {
  if (data.title) {
    data.slug = await generateUniqueSlug(data.title, id);
  }

  return await Project.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteProjectService = async (id) => {
  return await Project.findByIdAndDelete(id);
};