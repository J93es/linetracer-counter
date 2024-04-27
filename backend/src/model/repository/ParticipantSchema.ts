import mongoose from "mongoose";

const { Schema } = mongoose;

import { ParticipantRecordSchema } from "./ParticipantRecordSchema";

const robotSchema = new Schema({
  name: { type: String },
  cpu: { type: String },
  rom: { type: String },
  ram: { type: String },
  motorDriver: { type: String },
  motor: { type: String },
  adc: { type: String },
  sensor: { type: String },
});

const participantSchema = new Schema({
  hostId: { type: String, required: true, readonly: true },

  name: { type: String, required: true },
  association: { type: String },
  speech: { type: String },

  robot: { type: robotSchema },

  participantRecordList: {
    type: [Schema.Types.ObjectId],
    ref: "ParticipantRecordSchema",
    required: true,
  },
});

export const ParticipantSchema = mongoose.model(
  "ParticipantSchema",
  participantSchema
);
