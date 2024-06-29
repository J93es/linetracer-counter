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

import JwtService from "@auth/service/jwt-service";

import authRouter from "@auth/route/auth";
import contestRouter from "@route/admin/contest";
import partipantRouter from "@src/route/admin/participant";
import sectorRecordRouter from "@src/route/admin/sectorRecord";
import driveRecordRouter from "@src/route/admin/driveRecord";
import counterDeviceLogRouter from "@src/route/admin/counterDeviceLog";
import displayBoardRouter from "@src/route/display_board/sse";
import userRouter from "@route/user";

import { uri, PORT } from "@src/config";
import mongoose from "mongoose";

const app: Application = express();

const cache = apicache.middleware;

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

app.use(
  "/admin",
  expressRateLimit({
    windowMs: 60 * 1000,
    max: 100,
  }),
  authRouter
);

app.use("/contest", JwtService.tokenChecker, contestRouter);
app.use("/participant", JwtService.tokenChecker, partipantRouter);
app.use("/sector-record", JwtService.tokenChecker, sectorRecordRouter);
app.use("/drive-record", JwtService.tokenChecker, driveRecordRouter);
app.use("/counter-device-log", JwtService.tokenChecker, counterDeviceLogRouter);
app.use("/display-board", JwtService.tokenChecker, displayBoardRouter);

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
