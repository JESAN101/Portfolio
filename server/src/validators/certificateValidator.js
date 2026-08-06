import { body } from "express-validator";

const optionalFields = [
  body("issuedDate")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("Invalid issued date"),

  body("expiryDate")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("Invalid expiry date"),

  body("credentialId")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Credential ID must be at most 200 characters"),

  body("credentialUrl")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("Credential URL must be valid"),

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

export const certificateValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Certificate title is required")
    .isLength({ max: 200 })
    .withMessage("Title must be at most 200 characters"),

  body("issuer")
    .trim()
    .notEmpty()
    .withMessage("Issuer is required")
    .isLength({ max: 200 })
    .withMessage("Issuer must be at most 200 characters"),

  ...optionalFields,
];

export const updateCertificateValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Title must be at most 200 characters"),

  body("issuer")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Issuer must be at most 200 characters"),

  ...optionalFields,
];
