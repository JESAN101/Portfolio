import { body } from "express-validator";

const optionalFields = [
  body("fieldOfStudy")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Field of study must be at most 200 characters"),

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

  body("grade")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Grade must be at most 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Description must be at most 5000 characters"),

  body("order")
    .optional()
    .isInt()
    .withMessage("Order must be an integer"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
];

export const educationValidator = [
  body("institution")
    .trim()
    .notEmpty()
    .withMessage("Institution is required")
    .isLength({ max: 200 })
    .withMessage("Institution must be at most 200 characters"),

  body("degree")
    .trim()
    .notEmpty()
    .withMessage("Degree is required")
    .isLength({ max: 200 })
    .withMessage("Degree must be at most 200 characters"),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Invalid start date"),

  ...optionalFields,
];

export const updateEducationValidator = [
  body("institution")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Institution must be at most 200 characters"),

  body("degree")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Degree must be at most 200 characters"),

  ...optionalFields,
];
