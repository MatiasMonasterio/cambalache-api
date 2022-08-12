import type { User } from "@prisma/client";
import type { UserResponse } from "../../types";

export default function userAdapter(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    birthdayDate: user.birthdayDate,
    languaje: user.languaje,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
