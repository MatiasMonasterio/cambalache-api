import type { User } from "@prisma/client";

export type UserRequest = Omit<
  User,
  "id" | "repositories" | "createdAt" | "updatedAt" | "LoginHistory"
>;

export type UserResponse = Omit<User, "password">;

export enum Languaje {
  javascript,
  python,
  java,
  c,
  rust,
  go,
  r,
  swift,
  php,
}

export interface JwtEncode {
  id: number;
  name: string;
  email: string;
}

export interface JwtDecode extends JwtEncode {
  iat: number;
  exp: number;
}

export interface UserCredentials {
  email: string;
  password: string;
}
