import { loginHistoryDAL } from "../data-access-layer";

export default {
  addRegister: async (userId: number) => {
    return await loginHistoryDAL.addRegister(userId);
  },

  getLoginCountByUser: async (userId: number) => {
    return await loginHistoryDAL.getLoginCountByUser(userId);
  },
};
