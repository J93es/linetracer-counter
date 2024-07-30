import mongoose from "mongoose";

import { SectorRecordType } from "@model/SectorRecord";
import { sectorEnum, sectorRecord_sectorStateEnum } from "@model/enums/index";

const { Schema } = mongoose;

export const sectorRecordSchema = new Schema<SectorRecordType>({
  _id: { type: String, readonly: true },
  id: { type: String, unique: true, required: true, readonly: true },
  hostId: { type: String, required: true, readonly: true },

  contestSector: {
    type: String,
    required: true,
    enum: sectorEnum,
  },
  order: { type: Number, required: true },
  remainingContestTime: { type: Number, required: true },
  sectorState: {
    type: String,
    required: true,
    enum: sectorRecord_sectorStateEnum,
  },

  driveRecordList: {
    type: [],
    ref: "DriveRecordSchema",
    required: true,
  },
});
