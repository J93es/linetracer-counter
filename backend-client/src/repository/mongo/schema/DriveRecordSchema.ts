import mongoose from "mongoose";

import { DriveRecordType } from "@model/DriveRecord";
import { driveRecord_typeEnum } from "@model/enums/index";

const { Schema } = mongoose;

export const driveRecordSchema = new Schema<DriveRecordType>({
  _id: { type: String, readonly: true },
  id: { type: String, unique: true, required: true, readonly: true },
  hostId: { type: String, required: true, readonly: true },
  type: {
    type: String,
    required: true,
    enum: driveRecord_typeEnum,
  },
  recordTime: { type: Number, required: true },
  writeTime: { type: Number, required: true },
});
