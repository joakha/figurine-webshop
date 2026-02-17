import { body } from "express-validator";
import { checkValidationResult } from "./validationFunctions.js";

const validateAddProduct = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name required")
    .isString().withMessage('Name must be a string'),

  body("description")
    .trim()
    .notEmpty().withMessage("Description required")
    .isString().withMessage("Description must be a string"),

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

  body("timeToDelivery")
    .trim()
    .notEmpty().withMessage("Time to delivery is required")
    .isString().withMessage("Time to delivery must be a string"),

    checkValidationResult
];

export {
    validateAddProduct
}