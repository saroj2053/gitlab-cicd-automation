import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

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
