import express, { Router, Request, Response, NextFunction } from "express";

import { ContestType } from "@model/Contest";

import { contestService } from "@service/index";

const router: Router = express.Router();

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

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;

    const contest: Partial<ContestType> = await contestService.get(id);

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

router.post("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const id: string = req.params.id;
    if (!data.id) {
      data.id = id;
    }
    if (id !== data.id) {
      throw new Error("id is not matched : query id and body id is different");
    }

    const contest: Partial<ContestType> = await contestService.post(data);

    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(contest).status(200);
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

      const contest: Partial<ContestType> = await contestService.patch(
        id,
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

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const id: string = req.params.id;

    const contest: Partial<ContestType> = await contestService.put(id, data);

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
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;

      const contest: Partial<ContestType> = await contestService.remove(id);

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
