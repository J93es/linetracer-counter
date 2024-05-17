import mongoose from "mongoose";

import { DriveRecordType } from "@model/DriveRecord";

const { Schema } = mongoose;

export const driveRecordSchema = new Schema<DriveRecordType>({
  _id: { type: String, readonly: true },
  id: { type: String, unique: true, required: true, readonly: true },
  hostId: { type: String, required: true, readonly: true },
  type: {
    type: String,
    required: true,
    enum: ["Ignored", "Line-Out", "Pit-In-KO", "SUCCESS"],
  },
  recordTime: { type: Number, required: true },
  writeTime: { type: Number, required: true },
});

export const DriveRecordSchema = mongoose.model(
  "DriveRecordSchema",
  driveRecordSchema
);
