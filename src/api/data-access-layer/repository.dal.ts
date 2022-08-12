import type { Repository } from "@prisma/client";
import db from "../../database";

export default {
  getAll: async () => {
    return await db.repository.findMany();
  },

  getOneById: async (id: number) => {
    return await db.repository.findUnique({ where: { id: id } });
  },

  getOneByIdWithUsers: async (id: number) => {
    return await db.repository.findUnique({ where: { id: id }, include: { users: true } });
  },

  getOneByIdAndUserId: async (id: number, userId: number) => {
    return await db.repository.findFirst({
      where: { id: id, users: { some: { id: userId } } },
    });
  },

  getAllByUserId: async (userId: number) => {
    return await db.repository.findMany({ where: { users: { some: { id: userId } } } });
  },

  create: async (repository: Repository, userId: number) => {
    return await db.repository.create({
      data: {
        name: repository.name,
        languaje: repository.languaje,
        ...(repository?.description && { description: repository.description }),
        users: { connect: { id: userId } },
      },
    });
  },

  update: async (id: number, repository: Repository) => {
    return await db.repository.update({
      where: { id: id },
      data: {
        ...(repository.name && { name: repository.name }),
        ...(repository.languaje && { languaje: repository.languaje }),
        ...(repository.description && { description: repository.description }),
      },
    });
  },

  deleteById: async (id: number) => {
    return await db.repository.delete({ where: { id: id } });
  },
};
