import express, {
  Router,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";

import { DriveRecordType } from "../model/DriveRecord";

import { DriveRecordServiceInterface } from "../core/service/driveRecord";
import { DriveRecordService } from "../service/driveRecord-service";

const router: Router = express.Router();
const driveRecordService: DriveRecordServiceInterface =
  new DriveRecordService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("hello get");
});

router.get("/:_id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id: string = req.params._id;
    const driveRecord: Partial<DriveRecordType> =
      await driveRecordService.getDriveRecord(_id);

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
    const sectorRecord_Id: string = req.query.sector_record_id as string;

    const driveRecord: Partial<DriveRecordType> =
      await driveRecordService.postDriveRecord(sectorRecord_Id, data);

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
  "/:_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const _id: string = req.params._id;
      const sectorRecord_Id: string = req.query.sector_record_id as string;

      const driveRecord: Partial<DriveRecordType> =
        await driveRecordService.patchDriveRecord(sectorRecord_Id, _id, data);

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

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("hello patch");
});

router.put("/:_id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const _id: string = req.params._id;
    const sectorRecord_Id: string = req.query.sector_record_id as string;

    const driveRecord: Partial<DriveRecordType> =
      await driveRecordService.putDriveRecord(sectorRecord_Id, _id, data);

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

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("hello delete");
});

router.delete(
  "/:_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const _id: string = req.params._id;
      const sectorRecord_Id: string = req.query.sector_record_id as string;

      const driveRecord: Partial<DriveRecordType> =
        await driveRecordService.removeDriveRecord(sectorRecord_Id, _id);

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
