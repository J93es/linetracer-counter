import mongoose from "mongoose";

import { contestSchema } from "@repository/mongo/schema/ContestSchema";
import { participantSchema } from "@repository/mongo/schema/ParticipantSchema";
import { sectorRecordSchema } from "@repository/mongo/schema/SectorRecordSchema";
import { driveRecordSchema } from "@repository/mongo/schema/DriveRecordSchema";
import { counterDeviceLogSchema } from "@repository/mongo/schema/CounterDeviceLogSchema";

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
