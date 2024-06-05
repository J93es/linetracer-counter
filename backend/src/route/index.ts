import express, { Router, Request, Response, NextFunction } from "express";

import { sendSuccessResponse, sendErrorResponse } from "@route/utils/response";

const router: Router = express.Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.render("index", { title: "Express" });
});

export default router;
