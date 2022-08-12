import type { JwtDecode, JwtEncode } from "../types";

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export default {
  sign: (payload: JwtEncode) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "30m" });
  },
  verify: (token: string) => {
    return jwt.verify(token, JWT_SECRET) as JwtDecode;
  },
};
