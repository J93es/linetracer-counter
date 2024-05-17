import express, { Router, Request, Response, NextFunction } from "express";

import { userService } from "@service/index";
const router: Router = express.Router();

/* GET home page. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello, user").status(200);
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = await userService.getData(id);
    res.send(data).status(200);
  } catch (e) {
    console.error(e);
    res.send(e).status(404);
  }
});

export default router;
