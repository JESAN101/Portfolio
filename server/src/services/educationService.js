import Education from "../models/Education.js";
import { AppError } from "../utils/AppError.js";
import { paginate } from "../utils/queryBuilder.js";

const SEARCHABLE = ["institution", "degree", "fieldOfStudy", "description"];
const FILTERABLE = ["current", "isActive"];
const BOOLEAN_FIELDS = ["current", "isActive"];
const SORTABLE = {
  createdAt: 1,
  updatedAt: 1,
  institution: 1,
  startDate: 1,
  order: 1,
};

export const createEducationService = async (data) => {
  return Education.create(data);
};

export const getEducationsService = async (query = {}) => {
  return paginate(Education, query, {
    searchable: SEARCHABLE,
    filterable: FILTERABLE,
    booleanFields: BOOLEAN_FIELDS,
    sortable: SORTABLE,
  });
};

export const getEducationService = async (id) => {
  const education = await Education.findById(id);

  if (!education) throw new AppError("Education not found", 404);

  return education;
};

export const updateEducationService = async (id, data) => {
  const education = await Education.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!education) throw new AppError("Education not found", 404);

  return education;
};

export const deleteEducationService = async (id) => {
  const education = await Education.findByIdAndDelete(id);

  if (!education) throw new AppError("Education not found", 404);

  return education;
};

export const reorderEducationsService = async (items = []) => {
  const operations = items.map((item) => ({
    updateOne: {
      filter: { _id: item.id },
      update: { $set: { order: item.order } },
    },
  }));

  if (operations.length) {
    await Education.bulkWrite(operations);
  }

  return Education.find().sort({ order: 1, createdAt: 1 });
};
