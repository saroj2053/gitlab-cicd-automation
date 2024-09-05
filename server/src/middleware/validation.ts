import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

// middleware to handle errors
// if error then it sends a status of 400
// otherwise it calls the next function in the middleware chain

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation rules for the API request body
// Ensuring "version" and "dependencies" cannot be empty
export const validateRConfigRequest = [
  body("version")
    .isString()
    .notEmpty()
    .withMessage("R version must be a string"),
  body("dependencies")
    .isArray()
    .withMessage("Dependencies must be an array")
    .not()
    .isEmpty()
    .withMessage("Dependencies array cannot be empty"),
  handleValidationErrors,
];
