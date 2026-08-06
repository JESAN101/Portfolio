import Experience from "../models/Experience.js";
import { AppError } from "../utils/AppError.js";
import { paginate } from "../utils/queryBuilder.js";

const SEARCHABLE = ["company", "position", "description", "technologies"];
const FILTERABLE = ["current", "isActive"];
const BOOLEAN_FIELDS = ["current", "isActive"];
const SORTABLE = {
  createdAt: 1,
  updatedAt: 1,
  company: 1,
  startDate: 1,
  order: 1,
};

export const createExperienceService = async (data) => {
  return Experience.create(data);
};

export const getExperiencesService = async (query = {}) => {
  return paginate(Experience, query, {
    searchable: SEARCHABLE,
    filterable: FILTERABLE,
    booleanFields: BOOLEAN_FIELDS,
    sortable: SORTABLE,
  });
};

export const getExperienceService = async (id) => {
  const experience = await Experience.findById(id);

  if (!experience) throw new AppError("Experience not found", 404);

  return experience;
};

export const updateExperienceService = async (id, data) => {
  const experience = await Experience.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!experience) throw new AppError("Experience not found", 404);

  return experience;
};

export const deleteExperienceService = async (id) => {
  const experience = await Experience.findByIdAndDelete(id);

  if (!experience) throw new AppError("Experience not found", 404);

  return experience;
};

export const reorderExperiencesService = async (items = []) => {
  const operations = items.map((item) => ({
    updateOne: {
      filter: { _id: item.id },
      update: { $set: { order: item.order } },
    },
  }));

  if (operations.length) {
    await Experience.bulkWrite(operations);
  }

  return Experience.find().sort({ order: 1, createdAt: 1 });
};
