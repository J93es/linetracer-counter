import express, { Router, Request, Response, NextFunction } from "express";

import { sendSuccessResponse, sendErrorResponse } from "@route/utils/response";

import { userService } from "@service/index";
const router: Router = express.Router();

/* GET home page. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello, user").status(200);
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = await userService.getData(id);

    sendSuccessResponse(res, data);
    next();
  } catch (err) {
    sendErrorResponse(res, err);
    next();
  }
});

export default router;
