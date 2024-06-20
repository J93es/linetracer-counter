import mongoose from "mongoose";

import { contestSchema } from "@src/repository/mongo/schema/ContestSchema";
import { participantSchema } from "@src/repository/mongo/schema/ParticipantSchema";
import { sectorRecordSchema } from "@src/repository/mongo/schema/SectorRecordSchema";
import { driveRecordSchema } from "@src/repository/mongo/schema/DriveRecordSchema";
import { counterDeviceLogSchema } from "@src/repository/mongo/schema/CounterDeviceLogSchema";

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
