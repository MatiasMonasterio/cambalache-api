import { UserCredentials, UserRequest } from "../../types";

import cache from "../../cache";
import { httpErrorResponse, bcrypt, jwt } from "../../utilities";

import { usersService, loginHistoryService } from "../services";

export default {
  register: async (user: UserRequest) => {
    const newUser = await usersService.create(user);
    await loginHistoryService.addRegister(newUser.id);

    return jwt.sign({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  },

  login: async (credentials: UserCredentials) => {
    const { email, password } = credentials;

    const user = await usersService.getOneByEmail(email);
    if (!user) throw httpErrorResponse(401, "Invalid email or password");

    const passwordCorrenct = await bcrypt.compare(password, user.password);
    if (!passwordCorrenct) throw httpErrorResponse(401, "Invalid email or password");

    await loginHistoryService.addRegister(user.id);

    return jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  },

  logout: async (token: string, exp: number) => {
    await cache.set(token, exp);
  },
};
