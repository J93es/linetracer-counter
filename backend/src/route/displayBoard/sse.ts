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

    Object.keys(clients).forEach((key: string) => {
      console.log(key);
      try {
        clients[key].res.write(`data: ${JSON.stringify(payload)}\n\n`);
      } catch (err) {
        console.error(err);
      }
    });
    next();
  } catch (err) {
    console.error(err);
    next();
  }
};

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clientId = req?.headers["x-request-id"] as string;

    if (clientId === undefined) {
      throw new Error("request.body.id is empty");
    }

    res.writeHead(200, sseHeaders);

    clients[clientId] = {
      res,
    };

    req.on("close", () => {
      delete clients[clientId];
    });
    sseNotifyDisplayBoard(req, res, next);
    next();
  } catch (err: any) {
    sendErrorResponse(res, err);
    next();
  } finally {
  }
});

export default router;
