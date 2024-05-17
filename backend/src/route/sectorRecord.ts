import express, { Router, Request, Response, NextFunction } from "express";

import { SectorRecordType } from "@model/SectorRecord";

import { sectorRecordService } from "@service/index";

const router: Router = express.Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const sectorRecord: Partial<SectorRecordType> =
      await sectorRecordService.get(id);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(sectorRecord).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const sectorRecord: Partial<SectorRecordType> =
      await sectorRecordService.post(data);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(sectorRecord).status(200);
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

      const sectorRecord: Partial<SectorRecordType> =
        await sectorRecordService.patch(id, data);

      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(200);
      res.send(sectorRecord);
    } catch (err: any) {
      console.error(err);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(404);
      res.send({ message: err.toString() });
    }
  }
);

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("hello patch");
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const id: string = req.params.id;

    const sectorRecord: Partial<SectorRecordType> =
      await sectorRecordService.put(id, data);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(sectorRecord);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(404);
    res.send({ message: err.toString() });
  }
});

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("hello delete");
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;

      const sectorRecord: Partial<SectorRecordType> =
        await sectorRecordService.remove(id);

      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(200);
      res.send(sectorRecord);
    } catch (err: any) {
      console.error(err);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(404);
      res.send({ message: err.toString() });
    }
  }
);

export default router;
