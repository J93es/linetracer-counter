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
import corsOptions from "./cors/index";

const app: Application = express();

import indexRouter from "./routes/index";
import partipantRouter from "./routes/participant";
import contestRouter from "./routes/contest";
import userRouter from "./routes/user";

import { uri } from "./config";
import mongoose from "mongoose";

app.set("port", process.env.PORT || 8000);

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/participant", partipantRouter);
app.use("/contest", contestRouter);
app.use("/user", userRouter);

// // catch 404 and forward to error handler
// app.use((req: Request, res: Response, next: NextFunction) => {
//   next(createError(404));
// });

// error handler
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.toString();
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(500);
  res.render("error");
});

// app.listen(app.get("port"), () => {
//   console.log(app.get("port"), "번에서 대기중");
// });

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
