import express, { Router, Request, Response, NextFunction } from "express";

import { DriveRecordType } from "@model/DriveRecord";

import { driveRecordService } from "@service/index";

const router: Router = express.Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const driveRecord: Partial<DriveRecordType> = await driveRecordService.get(
      id
    );

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(driveRecord).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const driveRecord: Partial<DriveRecordType> = await driveRecordService.post(
      data
    );

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(driveRecord).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.patch("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("hello patch");
});

router.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const id: string = req.params.id;

      const driveRecord: Partial<DriveRecordType> =
        await driveRecordService.patch(id, data);

      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(200);
      res.send(driveRecord);
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

    const driveRecord: Partial<DriveRecordType> = await driveRecordService.put(
      id,
      data
    );

    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(driveRecord);
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

      const driveRecord: Partial<DriveRecordType> =
        await driveRecordService.remove(id);

      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(200);
      res.send(driveRecord);
    } catch (err: any) {
      console.error(err);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(404);
      res.send({ message: err.toString() });
    }
  }
);

export default router;
