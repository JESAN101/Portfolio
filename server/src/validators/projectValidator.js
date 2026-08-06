import { body } from "express-validator";

const CATEGORIES = ["Web", "Mobile", "Desktop", "UI/UX", "Other"];

const optionalFields = [
  body("shortDescription")
    .optional()
    .trim()
    .isLength({ min: 10, max: 250 })
    .withMessage("Short description must be between 10 and 250 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 20 })
    .withMessage("Description must be at least 20 characters"),

  body("githubUrl")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("GitHub URL must be valid"),

  body("liveUrl")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("Live URL must be valid"),

  body("category")
    .optional()
    .isIn(CATEGORIES)
    .withMessage("Invalid category"),

  body("technologies")
    .optional()
    .isArray()
    .withMessage("Technologies must be an array"),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("featured must be a boolean"),

  body("published")
    .optional()
    .isBoolean()
    .withMessage("published must be a boolean"),

  body("order")
    .optional()
    .isInt()
    .withMessage("Order must be an integer"),
];

const projectValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("shortDescription")
    .trim()
    .notEmpty()
    .withMessage("Short description is required")
    .isLength({ min: 10, max: 250 })
    .withMessage("Short description must be between 10 and 250 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 20 })
    .withMessage("Description must be at least 20 characters"),

  body("githubUrl")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("GitHub URL must be valid"),

  body("liveUrl")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("Live URL must be valid"),

  body("category")
    .optional()
    .isIn(CATEGORIES)
    .withMessage("Invalid category"),

  body("technologies")
    .isArray({ min: 1 })
    .withMessage("At least one technology is required"),
];

export const updateProjectValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  ...optionalFields,
];

export const publishValidator = [
  body("published")
    .isBoolean()
    .withMessage("published is required and must be a boolean"),
];

export const featureValidator = [
  body("featured")
    .isBoolean()
    .withMessage("featured is required and must be a boolean"),
];

export const orderValidator = [
  body("order")
    .isInt()
    .withMessage("order is required and must be an integer"),
];

export default projectValidator;
