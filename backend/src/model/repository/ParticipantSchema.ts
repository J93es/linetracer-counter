import mongoose from "mongoose";

const { Schema } = mongoose;

const driveRecordSchema = new Schema({
  type: { type: String, required: true },
  isPreliminary: { type: Boolean, required: true },
  recordTime: { type: Number, required: true },
});

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

  contestSector: { type: String, required: true },
  remainingContestTime: { type: Number, required: true },

  preliminaryOrder: { type: Number, required: true },
  mainOrder: { type: Number },

  robot: { type: robotSchema },

  driveRecord: {
    type: [driveRecordSchema],
    required: true,
  },
});

export const ParticipantSchema = mongoose.model(
  "ParticipantSchema",
  participantSchema
);
