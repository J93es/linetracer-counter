import express, {
  Router,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";

import { ContestType } from "@src/model/Contest";

import { ContestServiceInterface } from "@src/core/service/contest";
import { ContestService } from "@src/service/contest-service";

const router: Router = express.Router();
const contestService: ContestServiceInterface = new ContestService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contest: Partial<ContestType[]> = await contestService.getEvery();

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(contest).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.get("/:_id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id: string = req.params._id;

    const contest: Partial<ContestType> = await contestService.get(_id);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(contest).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const contest: Partial<ContestType> = await contestService.post(data);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(contest).status(200);
  } catch (err: any) {
    console.error(err);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send({ message: err.toString() }).status(404);
  }
});

router.post(
  "/:_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const _id: string = req.params._id;
      if (!data._id) {
        data._id = _id;
      }
      if (_id !== data._id) {
        throw new Error(
          "id is not matched : query id and body id is different"
        );
      }

      const contest: Partial<ContestType> = await contestService.post(data);

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
  "/:_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const _id: string = req.params._id;

      const contest: Partial<ContestType> = await contestService.patch(
        _id,
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

router.put("/:_id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const _id: string = req.params._id;

    const contest: Partial<ContestType> = await contestService.put(_id, data);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(contest).status(200);
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

      const contest: Partial<ContestType> = await contestService.remove(_id);

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
