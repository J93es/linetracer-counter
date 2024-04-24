import express, {
  Router,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";

import { ContestType } from "../model/Contest";

import { ContestRepository } from "../core/repository/contest";
import { ContestMongoRepo } from "../repository/mongo/contest";

const contestRepository: ContestRepository = new ContestMongoRepo();

const router: Router = express.Router();

router.get("/", async (req, res) => {
  res.send("hello get").status(200);
});

router.get("/:year", async (req, res, next) => {
  try {
    const year: string = req.params.year;
    const contest: Partial<ContestType> =
      await contestRepository.readContestWithParticipant({
        idYear: year,
      });

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(contest).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;

    const contest: Partial<ContestType> = await contestRepository.createContest(
      data
    );

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(contest).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.post("/:year", async (req: any, res, next) => {
  try {
    const data = req.body;
    const year: string = req.params.year;
    if (!data.year) {
      data.year = year;
    }
    if (year !== data.year) {
      throw new Error("id is not matched : query id and body id is different");
    }

    const contest: Partial<ContestType> = await contestRepository.createContest(
      data
    );

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(contest).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.patch("/", async (req, res, next) => {
  res.send("hello patch");
});

router.patch("/:year", async (req, res, next) => {
  try {
    const data = req.body;
    const year: string = req.params.year;
    if (!data.year) {
      data.year = year;
    }
    if (year !== String(data.year)) {
      throw new Error(
        "year is not matched : query year and body year is different"
      );
    }

    const Contest: Partial<ContestType> = await contestRepository.updateContest(
      { contestYear: year },
      data
    );

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(Contest).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(404);
    res.send({ message: err.toString() });
  }
});

router.delete("/", async (req, res, next) => {
  res.send("hello delete");
});

router.delete("/:year", async (req, res, next) => {
  try {
    const year: string = req.params.year;

    const contest: Partial<ContestType> = await contestRepository.deleteContest(
      { year: year }
    );

    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(200);
    res.send(contest);
  } catch (err: any) {
    console.log(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(404);
    res.send({ message: err.toString() });
  }
});

export default router;
