import mongoose from "mongoose";

import { contestSchema } from "@model/repository/mongo/ContestSchema";
import { participantSchema } from "@model/repository/mongo/ParticipantSchema";
import { sectorRecordSchema } from "@model/repository/mongo/SectorRecordSchema";
import { driveRecordSchema } from "@model/repository/mongo/DriveRecordSchema";
import { counterDeviceLogSchema } from "@model/repository/mongo/CounterDeviceLogSchema";

export const ContestSchema = mongoose.model("ContestSchema", contestSchema);
export const ParticipantSchema = mongoose.model(
  "ParticipantSchema",
  participantSchema
);
export const SectorRecordSchema = mongoose.model(
  "SectorRecordSchema",
  sectorRecordSchema
);
export const DriveRecordSchema = mongoose.model(
  "DriveRecordSchema",
  driveRecordSchema
);
export const CounterDeviceLogSchema = mongoose.model(
  "CounterDeviceLogSchema",
  counterDeviceLogSchema
);
