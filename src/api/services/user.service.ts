import type { User } from "@prisma/client";
import type { UserRequest } from "../../types";

import { bcrypt, httpErrorResponse } from "../../utilities";
import { userDAL } from "../data-access-layer";
import { userAdapter } from "../adapters";
import { loginHistoryService, authService } from "../services";

export default {
  async getAll() {
    const users = await userDAL.getAll();
    return users.map((user) => userAdapter(user));
  },

  async getOneById(id: number) {
    const user = await userDAL.getOnebyId(id);
    if (!user) throw httpErrorResponse(404, "User not found");

    return userAdapter(user);
  },

  async getOneByEmail(email: string) {
    return await userDAL.getOneByEmail(email);
  },

  async getLoginCount(id: number) {
    const userExist = await userDAL.getOnebyId(id);
    if (!userExist) throw httpErrorResponse(404, "User not found");

    return await loginHistoryService.getLoginCountByUser(id);
  },

  async create(user: UserRequest) {
    const userExist = await userDAL.getOneByEmail(user.email);
    if (userExist) throw httpErrorResponse(409, "User already exist");

    user.password = await bcrypt.hash(user.password);
    const newUser = await userDAL.create(user);

    return userAdapter(newUser);
  },

  async update(id: number, user: User) {
    const userExist = await userDAL.getOnebyId(id);
    if (!userExist) throw httpErrorResponse(404, "User not found");

    if (user.email) {
      const userEmailExist = await userDAL.getOneByEmail(user.email);
      if (userEmailExist && userEmailExist.id !== user.id) {
        throw httpErrorResponse(409, "Email already register");
      }
    }

    const userUpdated = await userDAL.update(id, user);
    return userAdapter(userUpdated);
  },

  async delete(id: number, token: string, exp: number) {
    const userExist = await userDAL.getOnebyId(id);
    if (!userExist) throw httpErrorResponse(404, "User not found");

    await authService.logout(token, exp);

    const userDeleted = await userDAL.delete(id);
    return userAdapter(userDeleted);
  },
};
