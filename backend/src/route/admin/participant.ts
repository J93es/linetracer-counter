import express, { Router, Request, Response, NextFunction } from "express";

import { sendSuccessResponse, sendErrorResponse } from "@utils/response";

import { ParticipantType } from "@model/Participant";

import { participantService } from "@service/index";

import { notifyDisplayBoard } from "@src/route/display_board/index";

const router: Router = express.Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const participant: Partial<ParticipantType> = await participantService.get(
      id
    );

    sendSuccessResponse(res, participant);
  } catch (err: any) {
    sendErrorResponse(res, err);
  }
});

router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const participant: Partial<ParticipantType> =
        await participantService.post(data);

      sendSuccessResponse(res, participant);
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
      const participant: Partial<ParticipantType> =
        await participantService.patch(id, data);

      sendSuccessResponse(res, participant);
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
      const participant: Partial<ParticipantType> =
        await participantService.put(id, data);

      sendSuccessResponse(res, participant);
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
      const participant: Partial<ParticipantType> =
        await participantService.remove(id);

      sendSuccessResponse(res, participant);
      next();
    } catch (err: any) {
      sendErrorResponse(res, err);
      next();
    }
  },
  notifyDisplayBoard
);

export default router;
