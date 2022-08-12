import type { Repository } from "@prisma/client";
import { httpErrorResponse } from "../../utilities";

import { repositoryDAL, userDAL } from "../data-access-layer";

export default {
  getAll: async () => {
    return await repositoryDAL.getAll();
  },

  getAllByUserId: async (userId: number) => {
    const userExist = await userDAL.getOnebyId(userId);
    if (!userExist) throw httpErrorResponse(404, "User not found");

    return await repositoryDAL.getAllByUserId(userId);
  },

  getOneById: async (id: number) => {
    const repository = await repositoryDAL.getOneById(id);
    if (!repository) throw httpErrorResponse(404, "Repository not found");

    return repository;
  },

  create: async (repository: Repository, userId: number) => {
    return await repositoryDAL.create(repository, userId);
  },

  update: async (id: number, userId: number, repository: Repository) => {
    const repositoryExist = await repositoryDAL.getOneByIdAndUserId(id, userId);
    if (!repositoryExist) throw httpErrorResponse(404, "Repository not found");

    return await repositoryDAL.update(id, repository);
  },

  deleteById: async (id: number, userId: number) => {
    const repositoryExist = await repositoryDAL.getOneByIdAndUserId(id, userId);
    if (!repositoryExist) throw httpErrorResponse(404, "Repository not found");

    return await repositoryDAL.deleteById(id);
  },
};
