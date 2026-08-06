import { body } from "express-validator";

export const reorderValidator = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Items are required"),

  body("items.*.id")
    .isMongoId()
    .withMessage("Invalid item id"),

  body("items.*.order")
    .isInt()
    .withMessage("Order must be an integer"),
];

export const toggleBooleanValidator = (field) => [
  body(field)
    .isBoolean()
    .withMessage(`${field} must be a boolean`),
];
