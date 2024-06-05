import express, { Router, Request, Response, NextFunction } from "express";

import { sendErrorResponse } from "@route/utils/response";

import { idController } from "@core/main";

import { displayBoardService } from "@service/index";

const router: Router = express.Router();

const clients = {} as any;

const sseHeaders = {
  "Content-Type": "text/event-stream",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
  "X-Accel-Buffering": "no",
};

export const sseNotifyDisplayBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = await displayBoardService.getCurrentContest();
    console.log(Object.keys(clients));
    Object.keys(clients).forEach((key: string) => {
      clients[key].res.write(`data: ${JSON.stringify(payload)}\n\n`);
    });
    next();
  } catch (err) {
    console.error(err);
    next();
  }
};

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.writeHead(200, sseHeaders);

    const clientId: string = idController.generateId();
    clients[clientId] = {
      res,
    };

    req.on("close", () => {
      delete clients[clientId];
    });
    sseNotifyDisplayBoard(req, res, next);
  } catch (err) {
    sendErrorResponse(res, err);
    next();
  }
});

export default router;
