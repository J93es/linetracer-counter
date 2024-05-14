import mongoose from "mongoose";

import { DriveRecordType } from "@src/model/DriveRecord";

const { Schema } = mongoose;

export const driveRecordSchema = new Schema<DriveRecordType>({
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
