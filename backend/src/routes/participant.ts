import express, {
  Router,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";

// import { ParticipantService } from "../core/participant-service";
// import { ParticipantMongoService } from "../service/participant-mongo/participant-mongo-service";

import { ParticipantType } from "../model/index/Participant";

import { ParticipantRepository } from "../core/participant-repository";
import { ParticipantMongoRepo } from "../repository/participant-mongo-repo";

// const participantService: ParticipantService = new ParticipantMongoService();

const participantRepository: ParticipantRepository = new ParticipantMongoRepo();

const router: Router = express.Router();

router.get("/", async (req, res) => {
  res.send("OK").status(200);
});

router.get("/:id", async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const participant: Partial<ParticipantType> =
      await participantRepository.readParticipant(id);

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

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;

    const participant: Partial<ParticipantType> =
      await participantRepository.createParticipant(data);

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

// router.post("/:id", async (req: any, res, next) => {
//   try {
//     const data = req.body;

//     const participant: Partial<ParticipantType> =
//       await participantRepository.createParticipant(data);

//     res.header("Content-Type", "application/json; charset=utf-8");
//     res.status(200);
//     res.send(participant);
//   } catch (err: any) {
//     console.log(err);
//     res.header("Content-Type", "application/json; charset=utf-8");
//     res.status(404);
//     res.send({ message: err.toString() });
//   }
// });

router.put("/", async (req, res, next) => {
  res.send("hello put");
});

router.put("/:id", async (req, res, next) => {
  try {
    const data = req.body;

    const participant: ParticipantType =
      await participantRepository.replaceParticipant(data);

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

router.patch("/", async (req, res, next) => {
  res.send("hello patch");
});

router.patch("/:id", async (req, res, next) => {
  try {
    const data = req.body;

    const participant: Partial<ParticipantType> =
      await participantRepository.updateParticipant(data);

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

router.delete("/", async (req, res, next) => {
  res.send("hello delete");
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id: string = req.params.id;

    const participant: ParticipantType =
      await participantRepository.deleteParticipant(id);

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
