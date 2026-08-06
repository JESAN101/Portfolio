import { body } from "express-validator";

const optionalFields = [
  body("location")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Location must be at most 200 characters"),

  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid start date"),

  body("endDate")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("Invalid end date")
    .custom((value, { req }) => {
      if (value && req.body.startDate && new Date(value) < new Date(req.body.startDate)) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),

  body("current")
    .optional()
    .isBoolean()
    .withMessage("current must be a boolean"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Description must be at most 5000 characters"),

  body("technologies")
    .optional()
    .isArray()
    .withMessage("Technologies must be an array"),

  body("order")
    .optional()
    .isInt()
    .withMessage("Order must be an integer"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
];

export const experienceValidator = [
  body("company")
    .trim()
    .notEmpty()
    .withMessage("Company is required")
    .isLength({ max: 200 })
    .withMessage("Company must be at most 200 characters"),

  body("position")
    .trim()
    .notEmpty()
    .withMessage("Position is required")
    .isLength({ max: 200 })
    .withMessage("Position must be at most 200 characters"),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Invalid start date"),

  ...optionalFields,
];

export const updateExperienceValidator = [
  body("company")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Company must be at most 200 characters"),

  body("position")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Position must be at most 200 characters"),

  ...optionalFields,
];
