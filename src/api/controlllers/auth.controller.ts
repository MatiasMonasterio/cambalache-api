import type { Request, Response } from "express";
import { handleHttpError } from "../../utilities";

import { authService } from "../services";

export default {
  register: async (req: Request, res: Response) => {
    try {
      const token = await authService.register(req.body);
      res.json({ status: "OK", data: token });
    } catch (error) {
      handleHttpError(error, res);
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const token = await authService.login(req.body);
      res.json({ status: "OK", data: token });
    } catch (error) {
      handleHttpError(error, res);
    }
  },

  logout: async (req: Request, res: Response) => {
    const { value: token, exp } = req.token;
    try {
      await authService.logout(token, exp);
      res.send({ status: "OK" });
    } catch (error) {
      handleHttpError(error, res);
    }
  },
};
