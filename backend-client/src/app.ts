import "module-alias/register";
import "tsconfig-paths/register";

import dotenv from "dotenv";
dotenv.config();

import logger from "morgan";
import createError from "http-errors";
import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import apicache from "apicache";
import expressRateLimit from "express-rate-limit";

import corsOptions from "@utils/cors/index";

import userRouter from "@route/user";

import { uri, PORT } from "@config/index";
import mongoose from "mongoose";

const app: Application = express();

const cache = apicache.middleware;

app.set("trust proxy", "loopback");
app.set("port", process.env.PORT || PORT || 8000);
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/user",
  expressRateLimit({
    windowMs: 5 * 1000,
    max: 200,
  }),
  cache("5 seconds"),
  userRouter
);

// error handler
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.toString();
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(500);
  res.render("error");
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(app.get("port"), () => {
      console.log(app.get("port"), "번에서 대기중");
    });
  })
  .catch((err) => {
    console.error(err);
  });
