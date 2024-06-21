import express, { Router, Request, Response, NextFunction } from "express";

import { sendSuccessResponse, sendErrorResponse } from "@utils/response";

import { ContestType } from "@model/Contest";

import { contestService } from "@service/index";

import { notifyDisplayBoard } from "@route/displayBoard/index";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contestList: Partial<ContestType[]> = await contestService.getEvery();

    sendSuccessResponse(res, contestList);
    next();
  } catch (err: any) {
    sendErrorResponse(res, err);
    next();
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const contest: Partial<ContestType> = await contestService.get(id);

    sendSuccessResponse(res, contest);
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
      const contest: Partial<ContestType> = await contestService.post(data);

      sendSuccessResponse(res, contest);
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
      const contest: Partial<ContestType> = await contestService.patch(
        id,
        data
      );

      sendSuccessResponse(res, contest);
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

      const contest: Partial<ContestType> = await contestService.put(id, data);

      sendSuccessResponse(res, contest);
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
      const contest: Partial<ContestType> = await contestService.remove(id);

      sendSuccessResponse(res, contest);
      next();
    } catch (err: any) {
      sendErrorResponse(res, err);
      next();
    }
  },
  notifyDisplayBoard
);

export default router;
