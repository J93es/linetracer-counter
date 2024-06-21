import { Request, Response, NextFunction } from "express";
import { AdminType } from "@src/auth/model/admin";
import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY } from "@src/config";

export default class JwtService {
  static tokenChecker = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.cookie
        ?.split("zetinCounterAccessToken=")[1]
        .split(";")[0];
      if (!token) {
        return res.status(401).json({
          code: 401,
          message: "토큰이 없습니다.",
        });
      }
      const key = process.env.JWT_SECRET_KEY ?? JWT_SECRET_KEY;

      req.body.jwtDecoded = jwt.verify(token, key);
      return next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return res.status(419).json({
          code: 419,
          message: "토큰이 만료되었습니다.",
        });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          code: 401,
          message: "유효하지 않은 토큰입니다.",
        });
      }
      return res.status(404).json({
        code: 404,
        message: "토큰 오류",
      });
    }
  };

  static createJWT = async (admin: AdminType): Promise<string> => {
    const key = process.env.JWT_SECRET_KEY ?? JWT_SECRET_KEY;
    const token = jwt.sign({ type: "JWT", id: admin.id }, key, {
      expiresIn: "24h",
      issuer: "토큰발급자",
    });

    return token;
  };
}
