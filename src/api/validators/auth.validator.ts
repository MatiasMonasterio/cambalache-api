import { check } from "express-validator";

import errorMessages from "../../config/validator-error-messages";
import { Languaje } from "../../types";
import { checkValidation } from "../middleware";

export default {
  validateCredentials: [
    check("email")
      .exists()
      .withMessage(errorMessages.isRequired)
      .notEmpty()
      .withMessage(errorMessages.isRequired)
      .isEmail()
      .withMessage(errorMessages.isEmail)
      .trim(),
    check("password")
      .exists()
      .withMessage(errorMessages.isRequired)
      .notEmpty()
      .withMessage(errorMessages.isRequired)
      .isString()
      .withMessage(errorMessages.isString)
      .trim(),
    checkValidation,
  ],
  validateRegister: [
    check("name")
      .exists()
      .withMessage(errorMessages.isRequired)
      .notEmpty()
      .withMessage(errorMessages.isRequired)
      .isString()
      .withMessage(errorMessages.isString)
      .trim(),
    check("email")
      .exists()
      .withMessage(errorMessages.isRequired)
      .notEmpty()
      .withMessage(errorMessages.isRequired)
      .isEmail()
      .withMessage(errorMessages.isEmail)
      .trim()
      .toLowerCase(),
    check("birthdayDate")
      .exists()
      .withMessage(errorMessages.isRequired)
      .notEmpty()
      .withMessage(errorMessages.isRequired)
      .isDate()
      .withMessage(errorMessages.isDate)
      .toDate(),
    check("password").exists().notEmpty().isString().trim(),
    check("languaje")
      .trim()
      .toLowerCase()
      .custom((value) => {
        if (value === "") return true;

        if (!Object.keys(Languaje).includes(value)) {
          throw new Error("is not valid");
        }

        return true;
      }),
    checkValidation,
  ],
};
