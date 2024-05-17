import express, { Router, Request, Response, NextFunction } from "express";
import JwtService from "@auth/service/jwt-service";

const router: Router = express.Router();

/* GET home page. */
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await JwtService.createJWT({ id: req.adminId });

      console.log("token", token);

      res
        .send({
          code: 200,
          message: "token is created",
          token: token,
        })
        .status(200);
    } catch (e) {
      console.log(e);
    }
  }
);

router.post(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {}
);

export default router;
