import { Request } from "express";
import { AdminType } from "@src/auth/model/admin";
import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY } from "@src/config";

export default class JwtService {
  static getAdminIdFromRequest = (req: Request): string | null => {
    const token = this.extractTokenFromRequest(req);
    if (!token) {
      return null;
    }
    const jwtPayload = this.decodeJWT(token);
    return (jwtPayload as any)?.id || null;
  };

  static extractTokenFromRequest = (req: Request): string | undefined => {
    const TOKEN_PREFIX = "Bearer ";
    const auth = req.headers.authorization;
    const token = auth?.includes(TOKEN_PREFIX)
      ? auth.split(TOKEN_PREFIX)[1]
      : auth;
    return token;
  };

  static decodeJWT = (token: string) => {
    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY ?? JWT_SECRET_KEY
      );
      return decodedToken;
    } catch {
      return null;
    }
  };

  static createJWT = async (admin: AdminType): Promise<string> => {
    const token = jwt.sign(
      { id: admin.id },
      process.env.JWT_SECRET_KEY ?? JWT_SECRET_KEY
    );

    return token;
  };
}
