import { body } from "express-validator";
import { checkValidationResult } from "./validationFunctions.js";

const validateAddItem = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name required")
    .isString().withMessage('Name must be a string'),

  body("description")
    .trim()
    .notEmpty().withMessage("Description required")
    .isString().withMessage("Description must be a string"),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("Stock must be >= 0"),

  body("price")
    .optional()
    .isInt({ min: 0 }).withMessage("Price must be >= 0"),

  body("category")
    .notEmpty().withMessage("Category required")
    .isIn(["FANTASY", "SCIFI"]).withMessage("Category must be FANTASY or SCIFI"),

  body("availability")
    .optional()
    .isIn(["IN_STOCK", "WAITING", "OUT_OF_STOCK"])
    .withMessage("Availability must be IN_STOCK, WAITING or OUT_OF_STOCK"),

  body("estimatedDelivery")
    .trim()
    .notEmpty().withMessage("Estimated delivery is required")
    .isString().withMessage("Estimated delivery must be a string"),

    checkValidationResult
];

export {
    validateAddItem
}