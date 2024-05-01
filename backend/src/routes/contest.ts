import express, {
  Router,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";

import { ContestType } from "../model/index/Contest";

import { ContestServiceInterface } from "../core/service/contest";
import { ContestService } from "../service/contest-service";

const router: Router = express.Router();
const contestService: ContestServiceInterface = new ContestService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contest: Partial<ContestType[]> =
      await contestService.getContestList();

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(contest).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.get(
  "/:year",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const year: string = req.params.year;

      const contest: Partial<ContestType> = await contestService.getContest(
        year
      );

      res.header("Content-Type", "application/json; charset=utf-8");
      res.send(contest).status(200);
    } catch (err: any) {
      console.error(err);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.send({ message: err.toString() }).status(404);
    }
  }
);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const contest: Partial<ContestType> = await contestService.postContest(
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

router.post(
  "/:year",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const year: string = req.params.year;
      if (!data.year) {
        data.year = year;
      }
      if (year !== data.year) {
        throw new Error(
          "id is not matched : query id and body id is different"
        );
      }

      const contest: Partial<ContestType> = await contestService.postContest(
        data
      );

      res.header("Content-Type", "application/json; charset=utf-8");
      res.send(contest).status(200);
    } catch (err: any) {
      console.error(err);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.send({ message: err.toString() }).status(404);
    }
  }
);

router.patch("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("hello patch");
});

router.patch(
  "/:year",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const year: string = req.params.year;

      const contest: Partial<ContestType> = await contestService.patchContest(
        year,
        data
      );

      res.header("Content-Type", "application/json; charset=utf-8");
      res.send(contest).status(200);
    } catch (err: any) {
      console.error(err);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(404);
      res.send({ message: err.toString() });
    }
  }
);

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("hello put");
});

router.put(
  "/:year",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const year: string = req.params.year;

      const contest: Partial<ContestType> = await contestService.putContest(
        year,
        data
      );

      res.header("Content-Type", "application/json; charset=utf-8");
      res.send(contest).status(200);
    } catch (err: any) {
      console.error(err);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(404);
      res.send({ message: err.toString() });
    }
  }
);

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("hello delete");
});

router.delete(
  "/:year",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const year: string = req.params.year;

      const contest: Partial<ContestType> = await contestService.removeContest(
        year
      );

      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(200);
      res.send(contest);
    } catch (err: any) {
      console.error(err);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(404);
      res.send({ message: err.toString() });
    }
  }
);

export default router;
