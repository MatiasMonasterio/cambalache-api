import type { Request, Response } from "express";
import { handleHttpError, jwt } from "../../utilities";

import { repositoryService } from "../services";

export default {
  getAll: async (_req: Request, res: Response) => {
    try {
      const repositories = await repositoryService.getAll();
      res.json({ status: "OK", data: repositories });
    } catch (error) {
      handleHttpError(error, res);
    }
  },

  getOneById: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
      const repository = await repositoryService.getOneById(id);
      res.json({ status: "OK", data: repository });
    } catch (error) {
      handleHttpError(error, res);
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const autorization = req.get("authorization");

      if (autorization && autorization.toLocaleLowerCase().startsWith("bearer")) {
        const token = autorization.split(" ")[1];
        const { id: userId } = jwt.verify(token);

        const newRepository = await repositoryService.create(req.body, userId);
        res.status(201).send({ status: "OK", data: newRepository });
      }
    } catch (error) {
      handleHttpError(error, res);
    }
  },

  update: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const userId = req.token.userId;

    try {
      const repository = await repositoryService.update(id, userId, req.body);
      res.json({ status: "OK", data: repository });
    } catch (error) {
      handleHttpError(error, res);
    }
  },

  delete: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const userId = req.token.userId;

    try {
      await repositoryService.deleteById(id, userId);
      res.json({ status: "OK" });
    } catch (error) {
      handleHttpError(error, res);
    }
  },
};
