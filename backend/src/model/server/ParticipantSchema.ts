import mongoose from "mongoose";
import { driveRecordSchema } from "./DriveRecordSchema";

const { Schema } = mongoose;

const participantSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },

  participantName: { type: String, required: true },
  association: { type: String },
  speech: { type: String },

  robotName: { type: String },
  cpu: { type: String },
  rom: { type: String },
  ram: { type: String },
  motorDriver: { type: String },
  motor: { type: String },
  adc: { type: String },
  sensor: { type: String },

  sector: { type: String, required: true },
  entryOrder: { type: Number, required: true },
  realOrder: { type: Number, required: true },
  remainingContestTime: { type: Number, required: true },

  driveRecord: { type: [] },
});

export const ParticipantSchema = mongoose.model(
  "ParticipantSchema",
  participantSchema
);
