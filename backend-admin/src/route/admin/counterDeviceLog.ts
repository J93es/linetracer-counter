import express, { Router, Request, Response, NextFunction } from "express";

import { CounterDeviceLogType } from "@model/CounterDeviceLog";

import { sendSuccessResponse, sendErrorResponse } from "@utils/response";

import { counterDeviceLogService } from "@service/index";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hostId: string = req.query.hostId as string;
    const counterDeviceLogList: Partial<CounterDeviceLogType[]> =
      await counterDeviceLogService.getEvery(hostId);

    sendSuccessResponse(res, counterDeviceLogList);
    next();
  } catch (err: any) {
    sendErrorResponse(res, err);
    next();
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const counterDeviceLog: Partial<CounterDeviceLogType> =
      await counterDeviceLogService.get(id);

    sendSuccessResponse(res, counterDeviceLog);
    next();
  } catch (err: any) {
    sendErrorResponse(res, err);
    next();
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const counterDeviceLog: Partial<CounterDeviceLogType> =
      await counterDeviceLogService.post(data);

    sendSuccessResponse(res, counterDeviceLog);
    next();
  } catch (err: any) {
    sendErrorResponse(res, err);
    next();
  }
});

router.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const id: string = req.params.id;
      const counterDeviceLog: Partial<CounterDeviceLogType> =
        await counterDeviceLogService.patch(id, data);

      sendSuccessResponse(res, counterDeviceLog);
      next();
    } catch (err: any) {
      sendErrorResponse(res, err);
      next();
    }
  }
);

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const id: string = req.params.id;

    const counterDeviceLog: Partial<CounterDeviceLogType> =
      await counterDeviceLogService.put(id, data);

    sendSuccessResponse(res, counterDeviceLog);
    next();
  } catch (err: any) {
    sendErrorResponse(res, err);
    next();
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const counterDeviceLog: Partial<CounterDeviceLogType> =
        await counterDeviceLogService.remove(id);

      sendSuccessResponse(res, counterDeviceLog);
      next();
    } catch (err: any) {
      sendErrorResponse(res, err);
      next();
    }
  }
);

export default router;
