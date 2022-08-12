import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { httpErrorResponse, handleHttpError } from "../../utilities";

export default function checkValidation(req: Request, res: Response, next: NextFunction) {
  try {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      const errorMessage = `${validation.array()[0].param} ${validation.array()[0].msg}`;
      throw httpErrorResponse(400, errorMessage);
    }
    next();
  } catch (error) {
    handleHttpError(error, res);
  }
}
