import { body } from "express-validator";

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
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("GitHub URL must be valid"),

  body("liveUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Live URL must be valid"),

  body("category")
    .optional()
    .isIn(["Web", "Mobile", "Desktop", "UI/UX", "Other"])
    .withMessage("Invalid category"),

  body("technologies")
    .isArray({ min: 1 })
    .withMessage("At least one technology is required"),
];

export default projectValidator;