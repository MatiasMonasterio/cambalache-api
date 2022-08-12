import type { User } from "@prisma/client";
import type { UserRequest } from "../../types";
import db from "../../database";

export default {
  async getAll() {
    return await db.user.findMany();
  },

  async getOnebyId(id: number) {
    return await db.user.findUnique({ where: { id: id } });
  },

  async getOneByEmail(email: string) {
    return await db.user.findFirst({ where: { email: email } });
  },

  async create(user: UserRequest) {
    return await db.user.create({
      data: {
        name: user.name,
        email: user.email,
        birthdayDate: user.birthdayDate,
        password: user.password,
        ...(user.languaje && { languaje: user.languaje }),
      },
    });
  },

  async update(id: number, user: User) {
    return await db.user.update({
      where: { id: id },
      data: {
        ...(user.name && { name: user.name }),
        ...(user.email && { email: user.email }),
        ...(user.birthdayDate && { birthdayDate: user.birthdayDate }),
        ...(user.password && { password: user.password }),
        ...(user.languaje && { languaje: user.languaje }),
      },
    });
  },

  async delete(id: number) {
    const transaction = await db.$transaction([
      db.loginHistory.deleteMany({ where: { userId: id } }),
      db.repository.deleteMany({ where: { users: { some: { id: id } } } }),
      db.user.delete({ where: { id: id } }),
    ]);

    return transaction[transaction.length - 1] as User;
  },
};
