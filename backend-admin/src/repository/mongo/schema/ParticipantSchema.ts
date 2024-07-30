import mongoose from "mongoose";

const { Schema } = mongoose;

import { RobotType } from "@model/Robot";

export const robotSchema = new Schema<RobotType>({
  hostId: { type: String, required: true, readonly: true },
  name: { type: String },
  cpu: { type: String },
  rom: { type: String },
  ram: { type: String },
  motorDriver: { type: String },
  motor: { type: String },
  adc: { type: String },
  sensor: { type: String },
});

export const participantSchema = new Schema({
  _id: { type: String, readonly: true },
  id: { type: String, unique: true, required: true, readonly: true },
  hostId: { type: String, required: true, readonly: true },

  name: { type: String, required: true },
  association: { type: String, default: "" },
  speech: { type: String },

  robot: { type: robotSchema },

  sectorRecordList: {
    type: [String],
    ref: "SectorRecordSchema",
    required: true,
  },
});
