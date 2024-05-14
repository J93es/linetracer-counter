import express, {
  Router,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";

import { ParticipantType } from "@src/model/Participant";

import { ParticipantServiceInterface } from "@src/core/service/participant";
import { ParticipantService } from "@src/service/participant-service";

const router: Router = express.Router();
const participantService: ParticipantServiceInterface =
  new ParticipantService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contest_Id: string = req.query.contest_Id as string;
    const participant: Partial<ParticipantType[]> =
      await participantService.getEvery(contest_Id);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(participant).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.get("/:_id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id: string = req.params._id;
    const participant: Partial<ParticipantType> = await participantService.get(
      _id
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

router.patch("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("hello patch");
});

router.patch(
  "/:_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const _id: string = req.params._id;

      const participant: Partial<ParticipantType> =
        await participantService.patch(_id, data);

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

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("hello patch");
});

router.put("/:_id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const _id: string = req.params._id;

    const participant: Partial<ParticipantType> = await participantService.put(
      _id,
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

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("hello delete");
});

router.delete(
  "/:_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const _id: string = req.params._id;

      const participant: Partial<ParticipantType> =
        await participantService.remove(_id);

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
