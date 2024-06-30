import express, { Router, Request, Response, NextFunction } from "express";

import { sendSuccessResponse, sendErrorResponse } from "@utils/response";

import { DriveRecordType } from "@model/DriveRecord";

import { driveRecordService } from "@service/index";

import { notifyDisplayBoard } from "@route/display_board/index";

const router: Router = express.Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const driveRecord: Partial<DriveRecordType> = await driveRecordService.get(
      id
    );

    sendSuccessResponse(res, driveRecord);
    next();
  } catch (err: any) {
    sendErrorResponse(res, err);
    next();
  }
});

router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const driveRecord: Partial<DriveRecordType> =
        await driveRecordService.post(data);

      sendSuccessResponse(res, driveRecord);
      next();
    } catch (err: any) {
      sendErrorResponse(res, err);
      next();
    }
  },
  notifyDisplayBoard
);

router.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const id: string = req.params.id;

      const driveRecord: Partial<DriveRecordType> =
        await driveRecordService.patch(id, data);

      sendSuccessResponse(res, driveRecord);
      next();
    } catch (err: any) {
      sendErrorResponse(res, err);
      next();
    }
  },
  notifyDisplayBoard
);

router.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const id: string = req.params.id;

      const driveRecord: Partial<DriveRecordType> =
        await driveRecordService.put(id, data);

      sendSuccessResponse(res, driveRecord);
      next();
    } catch (err: any) {
      sendErrorResponse(res, err);
      next();
    }
  },
  notifyDisplayBoard
);

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const driveRecord: Partial<DriveRecordType> =
        await driveRecordService.remove(id);

      sendSuccessResponse(res, driveRecord);
      next();
    } catch (err: any) {
      sendErrorResponse(res, err);
      next();
    }
  },
  notifyDisplayBoard
);

export default router;
