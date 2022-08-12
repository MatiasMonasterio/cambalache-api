import db from "../../database";

export default {
  addRegister: async (userId: number) => {
    return await db.loginHistory.create({
      data: {
        userId: userId,
      },
    });
  },

  getLoginCountByUser: async (userId: number) => {
    const loginRegisters = await db.loginHistory.findMany({
      where: { userId: userId },
      select: { id: true },
    });

    return loginRegisters.length;
  },
};
