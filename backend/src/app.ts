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
import corsOptions from "@utils/cors/index";

import JwtService from "@auth/service/jwt-service";

import indexRouter from "@route/index";
import adminRouter from "@auth/route/admin";
import contestRouter from "@route/contest";
import partipantRouter from "@route/participant";
import sectorRecordRouter from "@route/sectorRecord";
import driveRecordRouter from "@route/driveRecord";
import counterDeviceLogRouter from "@route/counterDeviceLog";
import userRouter from "@route/user";

import { uri, PORT } from "@src/config";
import mongoose from "mongoose";

const app: Application = express();

const tokenChecker = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const adminIdFromToken = JwtService.getAdminIdFromRequest(req);
  req.adminId = adminIdFromToken;
  next();
};

app.set("port", process.env.PORT || PORT || 8000);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));

app.use(tokenChecker);
app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/contest", contestRouter);
app.use("/participant", partipantRouter);
app.use("/sector-record", sectorRecordRouter);
app.use("/drive-record", driveRecordRouter);
app.use("/counter-device-log", counterDeviceLogRouter);
app.use("/user", userRouter);

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
