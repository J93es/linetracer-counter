import express, { Router, Request, Response, NextFunction } from "express";

import { ParticipantType } from "@model/Participant";

import { participantService } from "@service/index";

const router: Router = express.Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const participant: Partial<ParticipantType> = await participantService.get(
      id
    );

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(participant).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const participant: Partial<ParticipantType> = await participantService.post(
      data
    );

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(participant).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const id: string = req.params.id;

      const participant: Partial<ParticipantType> =
        await participantService.patch(id, data);

      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(200);
      res.send(participant);
    } catch (err: any) {
      console.error(err);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(404);
      res.send({ message: err.toString() });
    }
  }
);

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const id: string = req.params.id;

    const participant: Partial<ParticipantType> = await participantService.put(
      id,
      data
    );

    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(participant);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(404);
    res.send({ message: err.toString() });
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;

      const participant: Partial<ParticipantType> =
        await participantService.remove(id);

      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(200);
      res.send(participant);
    } catch (err: any) {
      console.error(err);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(404);
      res.send({ message: err.toString() });
    }
  }
);

export default router;
