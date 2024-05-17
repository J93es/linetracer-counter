import express, { Router, Request, Response, NextFunction } from "express";

const router: Router = express.Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.render("index", { title: "Express" });
});

export default router;
