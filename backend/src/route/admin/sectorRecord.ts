import express, { Router, Request, Response, NextFunction } from "express";

import { sendSuccessResponse, sendErrorResponse } from "@utils/response";

import { SectorRecordType } from "@model/SectorRecord";

import { sectorRecordService } from "@service/index";

import { notifyDisplayBoard } from "@route/displayBoard/index";

const router: Router = express.Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const sectorRecord: Partial<SectorRecordType> =
      await sectorRecordService.get(id);

    sendSuccessResponse(res, sectorRecord);
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
      const sectorRecord: Partial<SectorRecordType> =
        await sectorRecordService.post(data);

      sendSuccessResponse(res, sectorRecord);
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
      const sectorRecord: Partial<SectorRecordType> =
        await sectorRecordService.patch(id, data);

      sendSuccessResponse(res, sectorRecord);
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
      const sectorRecord: Partial<SectorRecordType> =
        await sectorRecordService.put(id, data);

      sendSuccessResponse(res, sectorRecord);
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
      const sectorRecord: Partial<SectorRecordType> =
        await sectorRecordService.remove(id);

      sendSuccessResponse(res, sectorRecord);
      next();
    } catch (err: any) {
      sendErrorResponse(res, err);
      next();
    }
  },
  notifyDisplayBoard
);

export default router;
