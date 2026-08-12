import { body } from "express-validator";

export const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("A valid email is required"),

  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password is required"),
];

export const updatePasswordValidator = [
  body("currentPassword")
    .isString()
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .isString()
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters"),
];
