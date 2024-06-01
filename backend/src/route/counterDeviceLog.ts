import express, { Router, Request, Response, NextFunction } from "express";

import { CounterDeviceLogType } from "@model/CounterDeviceLog";

import { counterDeviceLogService } from "@service/index";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hostId: string = req.query.hostId as string;
    const counterDeviceLogList: Partial<CounterDeviceLogType[]> =
      await counterDeviceLogService.getEvery(hostId);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(counterDeviceLogList).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const counterDeviceLog: Partial<CounterDeviceLogType> =
      await counterDeviceLogService.get(id);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(counterDeviceLog).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const counterDeviceLog: Partial<CounterDeviceLogType> =
      await counterDeviceLogService.post(data);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(counterDeviceLog).status(200);
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

      const counterDeviceLog: Partial<CounterDeviceLogType> =
        await counterDeviceLogService.patch(id, data);

      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(200);
      res.send(counterDeviceLog);
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

    const counterDeviceLog: Partial<CounterDeviceLogType> =
      await counterDeviceLogService.put(id, data);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(counterDeviceLog);
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

      const counterDeviceLog: Partial<CounterDeviceLogType> =
        await counterDeviceLogService.remove(id);

      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(200);
      res.send(counterDeviceLog);
    } catch (err: any) {
      console.error(err);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(404);
      res.send({ message: err.toString() });
    }
  }
);

export default router;
