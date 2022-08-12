import type { Request, Response, NextFunction } from "express";

import cache from "../../cache";
import { jwt, httpErrorResponse, handleHttpError } from "../../utilities";

export default async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const autorization = req.get("authorization");

    if (autorization && autorization.toLocaleLowerCase().startsWith("bearer")) {
      const token = autorization.split(" ")[1];

      const reply = await cache.get(token);
      if (reply) throw new Error("Token missin or invalid");

      const decode = jwt.verify(token);
      if (!token || !decode.id) throw new Error("Token missin or invalid");

      req.token = {
        value: token,
        userId: decode.id,
        exp: decode.exp,
      };
      return next();
    }

    throw new Error("Token missin or invalid");
  } catch (error) {
    const err = error as { message: string };
    const errorResponse = httpErrorResponse(403, err?.message as string);
    handleHttpError(errorResponse, res);
  }
}
