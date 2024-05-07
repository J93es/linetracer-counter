import express, {
  Router,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";

import { ParticipantRecordType } from "../model/ParticipantRecord";

import { ParticipantRecordServiceInterface } from "../core/service/participantRecord";
import { ParticipantRecordService } from "../service/participantRecord-service";

const router: Router = express.Router();
const participantRecordService: ParticipantRecordServiceInterface =
  new ParticipantRecordService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const participant_id: string = req.query.participant_id as string;
    const participantRecordList: Partial<ParticipantRecordType[]> =
      await participantRecordService.getEveryParticipantRecord(participant_id);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(participantRecordList).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.get("/:_id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id: string = req.params._id;
    const participantRecord: Partial<ParticipantRecordType> =
      await participantRecordService.getParticipantRecord(_id);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(participantRecord).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const participantRecord: Partial<ParticipantRecordType> =
      await participantRecordService.postParticipantRecord(data);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(participantRecord).status(200);
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

      const participantRecord: Partial<ParticipantRecordType> =
        await participantRecordService.patchParticipantRecord(_id, data);

      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(200);
      res.send(participantRecord);
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

    const participantRecord: Partial<ParticipantRecordType> =
      await participantRecordService.putParticipantRecord(_id, data);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(participantRecord);
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

      const participantRecord: Partial<ParticipantRecordType> =
        await participantRecordService.removeParticipantRecord(_id);

      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(200);
      res.send(participantRecord);
    } catch (err: any) {
      console.error(err);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(404);
      res.send({ message: err.toString() });
    }
  }
);

export default router;
