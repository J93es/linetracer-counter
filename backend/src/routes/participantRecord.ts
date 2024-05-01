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
    const participant_Id: string = req.query.participant_Id as string;
    const participantRecordList: Partial<ParticipantRecordType[]> =
      await participantRecordService.getParticipantRecordIndex(participant_Id);

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
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const id: string = req.params.id;
      if (!data.id) {
        data.id = id;
      }
      if (id !== data.id) {
        throw new Error(
          "id is not matched : query id and body id is different"
        );
      }

      const participantRecord: Partial<ParticipantRecordType> =
        await participantRecordService.patchParticipantRecord(id, data);

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

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const id: string = req.params.id;
    if (!data.id) {
      data.id = id;
    }
    if (id !== data.id) {
      throw new Error("id is not matched : query id and body id is different");
    }

    const participantRecord: Partial<ParticipantRecordType> =
      await participantRecordService.putParticipantRecord(id, data);

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
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;

      const participantRecord: Partial<ParticipantRecordType> =
        await participantRecordService.removeParticipantRecord(id);

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
