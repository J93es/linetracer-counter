import mongoose from "mongoose";

import { SectorRecordType } from "@model/SectorRecord";
import { driveRecordSchema } from "@model/repository/mongo/DriveRecordSchema";

const { Schema } = mongoose;

export const sectorRecordSchema = new Schema<SectorRecordType>({
  _id: { type: String, readonly: true },
  id: { type: String, unique: true, required: true, readonly: true },
  hostId: { type: String, required: true, readonly: true },

  contestSector: {
    type: String,
    required: true,
    enum: [
      "freshman",
      "expert-STEP--pre",
      "expert-DC--pre",
      "Time-Attack",
      "expert-STEP--main",
      "expert-DC--main",
      "senior",
    ],
  },
  order: { type: Number, required: true },
  remainingContestTime: { type: Number, required: true },
  sectorState: {
    type: String,
    required: true,
    enum: ["ready", "running", "suspend", "end"],
  },

  driveRecordList: {
    type: [],
    ref: "DriveRecordSchema",
    required: true,
  },
});
