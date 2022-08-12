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
    check("email")
      .exists()
      .withMessage(errorMessages.isRequired)
      .notEmpty()
      .withMessage(errorMessages.notEmpty)
      .isEmail()
      .withMessage(errorMessages.isEmail)
      .normalizeEmail(),
    check("birthdayDate")
      .exists()
      .withMessage(errorMessages.isRequired)
      .notEmpty()
      .withMessage(errorMessages.notEmpty)
      .isDate()
      .withMessage(errorMessages.isDate)
      .toDate(),
    check("password")
      .exists()
      .withMessage(errorMessages.isRequired)
      .notEmpty()
      .withMessage(errorMessages.notEmpty)
      .isString()
      .withMessage(errorMessages.isString)
      .trim(),
    checkValidation,
  ],
  validateUpdate: [
    check("name").optional().isString().withMessage(errorMessages.isString).trim(),
    check("email").optional().isEmail().withMessage(errorMessages.isEmail).trim().normalizeEmail(),
    check("birthdayDate").optional().isDate().withMessage(errorMessages.isDate).toDate(),
    check("password").optional().isString().withMessage(errorMessages.isString).trim(),
    check("languaje")
      .optional()
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
