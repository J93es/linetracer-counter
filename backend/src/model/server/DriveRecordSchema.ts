import mongoose from "mongoose";

const { Schema } = mongoose;

export const driveRecordSchema = new Schema({
  state: { type: String },
  recordTime: { type: Number },
});

export const DriveRecordSchema = mongoose.model(
  "DriveRecordSchema",
  driveRecordSchema
);
