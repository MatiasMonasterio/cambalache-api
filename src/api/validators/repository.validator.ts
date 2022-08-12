import { check, param } from "express-validator";

import errorMessages from "../../config/validator-error-messages";
import { Languaje } from "../../types";
import { checkValidation } from "../middleware";

export default {
  validateIdParam: [
    param("id").toInt().isNumeric().withMessage(errorMessages.isNumeric),
    checkValidation,
  ],

  validateCreate: [
    check("name")
      .exists()
      .withMessage(errorMessages.isRequired)
      .notEmpty()
      .withMessage(errorMessages.notEmpty)
      .isString()
      .withMessage(errorMessages.isString)
      .trim(),
    check("description")
      .optional()
      .notEmpty()
      .withMessage(errorMessages.notEmpty)
      .isString()
      .withMessage(errorMessages.isString)
      .trim(),
    check("languaje")
      .exists()
      .withMessage(errorMessages.isRequired)
      .notEmpty()
      .withMessage(errorMessages.notEmpty)
      .isString()
      .withMessage(errorMessages.isString)
      .trim()
      .toLowerCase()
      .custom((value) => {
        if (!Object.keys(Languaje).includes(value)) {
          throw new Error("Invalid value");
        }

        return true;
      }),
    checkValidation,
  ],

  validateUpdate: [
    check("name")
      .optional()
      .notEmpty()
      .withMessage(errorMessages.notEmpty)
      .isString()
      .withMessage(errorMessages.isString)
      .trim(),
    check("description")
      .optional()
      .notEmpty()
      .withMessage(errorMessages.notEmpty)
      .isString()
      .withMessage(errorMessages.isString)
      .trim(),
    check("languaje")
      .optional()
      .notEmpty()
      .withMessage(errorMessages.notEmpty)
      .isString()
      .withMessage(errorMessages.isString)
      .trim()
      .toLowerCase()
      .custom((value) => {
        if (!Object.keys(Languaje).includes(value)) {
          throw new Error("Invalid value");
        }

        return true;
      }),
    checkValidation,
  ],
};
