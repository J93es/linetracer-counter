import express, {
  Router,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";

import { SectorRecordType } from "@src/model/SectorRecord";

import { SectorRecordServiceInterface } from "@src/core/service/sectorRecord";
import { SectorRecordService } from "@src/service/sectorRecord-service";

const router: Router = express.Router();
const sectorRecordService: SectorRecordServiceInterface =
  new SectorRecordService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const participant_id: string = req.query.participant_id as string;
    const sectorRecordList: Partial<SectorRecordType[]> =
      await sectorRecordService.getEvery(participant_id);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(sectorRecordList).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.get("/:_id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id: string = req.params._id;
    const sectorRecord: Partial<SectorRecordType> =
      await sectorRecordService.get(_id);

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
  "/:_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const _id: string = req.params._id;

      const sectorRecord: Partial<SectorRecordType> =
        await sectorRecordService.patch(_id, data);

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

router.put("/:_id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const _id: string = req.params._id;

    const sectorRecord: Partial<SectorRecordType> =
      await sectorRecordService.put(_id, data);

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
  "/:_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const _id: string = req.params._id;

      const sectorRecord: Partial<SectorRecordType> =
        await sectorRecordService.remove(_id);

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
