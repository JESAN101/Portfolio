import { body } from "express-validator";

export const profileValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("titles")
    .optional()
    .isArray()
    .withMessage("Titles must be an array"),

  body("titles.*")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Each title must be non-empty"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email"),

  body("github")
    .optional()
    .isURL()
    .withMessage("Invalid GitHub URL"),

  body("linkedin")
    .optional()
    .isURL()
    .withMessage("Invalid LinkedIn URL"),
];