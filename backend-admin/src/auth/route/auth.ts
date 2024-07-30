import express, { Router, Request, Response, NextFunction } from "express";
import JwtService from "@auth/service/jwt-service";
import { ADMIN_DATA } from "@config/index";

import { sendErrorResponse } from "@utils/response";

const router: Router = express.Router();

router.get("/check-auth", (req: Request, res: Response, next: NextFunction) => {
  try {
    JwtService.tokenChecker(req, res, () => {
      res.status(200).json({
        code: 200,
        message: "ok",
      });
    });
  } catch (e) {
    console.log(e);
    return sendErrorResponse(res, e);
  }
});

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqId = req.body.id;
      const reqPassword = req.body.password;

      const admin = ADMIN_DATA.find(
        (admin: any) => admin.id === reqId && admin.password === reqPassword
      );
      if (!admin) {
        return res.status(401).json({
          code: 401,
          message: "아이디 또는 비밀번호가 틀렸습니다.",
        });
      }

      const token = await JwtService.createJWT({ id: req.adminId });

      res
        .cookie("zetinCounterAccessToken", token, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
          sameSite: "none", // 이거 strict하면 origin 다를때 cors * 해줘도 cors 뜸.
          secure: true,
        })
        .send({
          code: 200,
          message: "ok",
        })
        .status(200);
    } catch (e) {
      console.log(e);
      return sendErrorResponse(res, e);
    }
  }
);

router.post(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res
        .cookie("zetinCounterAccessToken", "", {
          maxAge: 0,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .send({
          code: 200,
          message: "ok",
        })
        .status(200);
    } catch (e) {
      console.log(e);
      return sendErrorResponse(res, e);
    }
  }
);

export default router;
