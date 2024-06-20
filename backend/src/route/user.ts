import express, { Router, Request, Response, NextFunction } from "express";

import { sendSuccessResponse, sendErrorResponse } from "@route/utils/response";

import { userService } from "@service/index";
const router: Router = express.Router();

/* GET home page. */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await userService.getData();
    sendSuccessResponse(res, data);
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

export default router;
