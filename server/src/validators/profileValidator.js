import { body } from "express-validator";

export const profileValidator = [
  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name cannot be empty"),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty"),

  body("titles").optional().isArray().withMessage("Titles must be an array"),

  body("titles.*")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Each title must be non-empty"),

  body("email").optional().isEmail().withMessage("Invalid email"),

  body("phone")
    .optional()
    .isString()
    .isLength({ max: 30 })
    .withMessage("Phone must be at most 30 characters"),

  body("address").optional().isString().withMessage("Address must be a string"),

  body("location")
    .optional()
    .isString()
    .withMessage("Location must be a string"),

  body("shortBio")
    .optional()
    .isString()
    .withMessage("Short bio must be a string"),

  body("about").optional().isString().withMessage("About must be a string"),

  body("socials.github").optional().isURL().withMessage("Invalid GitHub URL"),

  body("socials.linkedin")
    .optional()
    .isURL()
    .withMessage("Invalid LinkedIn URL"),

  body("socials.twitter").optional().isURL().withMessage("Invalid Twitter URL"),

  body("socials.instagram")
    .optional()
    .isURL()
    .withMessage("Invalid Instagram URL"),

  body("socials.facebook")
    .optional()
    .isURL()
    .withMessage("Invalid Facebook URL"),
];
