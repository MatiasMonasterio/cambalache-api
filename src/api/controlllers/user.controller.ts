import type { Request, Response } from "express";
import { handleHttpError } from "../../utilities";
import { usersService, repositoryService } from "../services";

export default {
  async getAll(_req: Request, res: Response) {
    try {
      const users = await usersService.getAll();
      res.json({ status: "OK", data: users });
    } catch (error) {
      handleHttpError(error, res);
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await usersService.getOneById(id);

      res.json({ status: "OK", data: user });
    } catch (error) {
      handleHttpError(error, res);
    }
  },

  async getLoginCount(req: Request, res: Response) {
    const id = req.token.userId;

    try {
      const loginCount = await usersService.getLoginCount(id);
      res.json({ status: "OK", data: loginCount });
    } catch (error) {
      handleHttpError(error, res);
    }
  },

  async getRepositories(req: Request, res: Response) {
    const id = req.token.userId;

    try {
      const repositories = await repositoryService.getAllByUserId(id);
      res.json({ status: "OK", data: repositories });
    } catch (error) {
      handleHttpError(error, res);
    }
  },

  async getRepositoriesByUserId(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const repositories = await repositoryService.getAllByUserId(id);
      res.json({ status: "OK", data: repositories });
    } catch (error) {
      handleHttpError(error, res);
    }
  },

  async create(req: Request, res: Response) {
    try {
      const newUser = await usersService.create(req.body);
      res.status(201).json({ status: "OK", data: newUser });
    } catch (error) {
      handleHttpError(error, res);
    }
  },

  async update(req: Request, res: Response) {
    const id = req.token.userId;

    try {
      const userUpdated = await usersService.update(id, req.body);
      res.json({ status: "OK", data: userUpdated });
    } catch (error) {
      handleHttpError(error, res);
    }
  },

  async delete(req: Request, res: Response) {
    const { value: token, exp, userId: id } = req.token;

    try {
      const userDeleted = await usersService.delete(id, token, exp);
      res.json({ status: "OK", data: userDeleted });
    } catch (error) {
      handleHttpError(error, res);
    }
  },
};
