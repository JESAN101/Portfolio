import { body } from "express-validator";

const CATEGORIES = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Design",
  "Tools",
  "Other",
];

const optionalFields = [
  body("proficiency")
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage("Proficiency must be a number between 0 and 100"),

  body("category")
    .optional()
    .isIn(CATEGORIES)
    .withMessage("Invalid category"),

  body("icon")
    .optional()
    .isString()
    .withMessage("Icon must be a string"),

  body("order")
    .optional()
    .isInt()
    .withMessage("Order must be an integer"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
];

export const skillValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Skill name is required")
    .isLength({ max: 100 })
    .withMessage("Skill name must be at most 100 characters"),
  ...optionalFields,
];

export const updateSkillValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Skill name must be at most 100 characters"),
  ...optionalFields,
];
