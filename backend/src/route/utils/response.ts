import { Response, NextFunction } from "express";

export function sendSuccessResponse(res: Response, data: any) {
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send(data).status(200);
}

export function sendErrorResponse(res: Response, err: any) {
  console.error(err);
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send({ message: err.toString() }).status(404);
}
