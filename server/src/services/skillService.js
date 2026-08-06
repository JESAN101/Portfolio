import Skill from "../models/Skill.js";
import { AppError } from "../utils/AppError.js";
import { paginate } from "../utils/queryBuilder.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "./cloudinaryService.js";

const SEARCHABLE = ["name"];
const FILTERABLE = ["category", "isActive"];
const BOOLEAN_FIELDS = ["isActive"];
const SORTABLE = {
  createdAt: 1,
  updatedAt: 1,
  name: 1,
  order: 1,
  proficiency: 1,
};

export const createSkillService = async (data) => {
  return Skill.create(data);
};

export const getSkillsService = async (query = {}) => {
  return paginate(Skill, query, {
    searchable: SEARCHABLE,
    filterable: FILTERABLE,
    booleanFields: BOOLEAN_FIELDS,
    sortable: SORTABLE,
  });
};

export const getSkillService = async (id) => {
  const skill = await Skill.findById(id);

  if (!skill) throw new AppError("Skill not found", 404);

  return skill;
};

export const updateSkillService = async (id, data) => {
  const skill = await Skill.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!skill) throw new AppError("Skill not found", 404);

  return skill;
};

export const deleteSkillService = async (id) => {
  const skill = await Skill.findByIdAndDelete(id);

  if (!skill) throw new AppError("Skill not found", 404);

  if (skill.iconPublicId) {
    await deleteFromCloudinary(skill.iconPublicId);
  }

  return skill;
};

export const uploadSkillIconService = async (id, filePath) => {
  const skill = await Skill.findById(id);

  if (!skill) throw new AppError("Skill not found", 404);

  const uploaded = await uploadToCloudinary(filePath, {
    folder: "portfolio/skills/icons",
    resource_type: "image",
  });

  const previousPublicId = skill.iconPublicId;

  skill.icon = uploaded.url;
  skill.iconPublicId = uploaded.publicId;
  await skill.save();

  if (previousPublicId) {
    await deleteFromCloudinary(previousPublicId);
  }

  return skill;
};

export const reorderSkillsService = async (items = []) => {
  const operations = items.map((item) => ({
    updateOne: {
      filter: { _id: item.id },
      update: { $set: { order: item.order } },
    },
  }));

  if (operations.length) {
    await Skill.bulkWrite(operations);
  }

  return Skill.find().sort({ order: 1, createdAt: 1 });
};
