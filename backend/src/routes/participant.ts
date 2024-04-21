import express, {
  Router,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";

import { ParticipantService } from "../core/participant-service";
import { ParticipantFsService } from "../service/participant-fs/participant-fs-service";

import { ParticipantType } from "src/model/Participant/Participant";
import { ParticipantIdTitleType } from "src/model/Participant/ParticipantIdTitle";

const participantService: ParticipantService = new ParticipantFsService();

const router: Router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const idTitleList: Array<ParticipantIdTitleType> =
      participantService.getParticipantIndex();

    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send({ body: idTitleList });
  } catch (err: any) {
    console.log(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(404);
    res.send({ message: err.toString() });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const participant: ParticipantType = participantService.getParticipant(id);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(participant);
  } catch (err: any) {
    console.log(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(404);
    res.send({ message: err.toString() });
  }
});

router.post("/", (req, res, next) => {
  res.send("OK");
});

router.post("/:id", async (req: any, res, next) => {
  try {
    const data = req.body;

    const participant: ParticipantType =
      participantService.setParticipant(data);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(participant);
  } catch (err: any) {
    console.log(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(404);
    res.send({ message: err.toString() });
  }
});

export default router;
