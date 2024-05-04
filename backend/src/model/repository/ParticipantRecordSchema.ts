import mongoose from "mongoose";

const { Schema } = mongoose;

const driveRecordSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["Ignored", "Line-Out", "Pit-In-KO", "SUCCESS"],
  },
  recordTime: { type: Number, required: true },
});

const participantRecordSchema = new Schema({
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
    enum: ["ready", "running", "end"],
  },

  driveRecordList: {
    type: [driveRecordSchema],
    ref: "DriveRecordSchema",
    required: true,
  },
});

export const ParticipantRecordSchema = mongoose.model(
  "ParticipantRecordSchema",
  participantRecordSchema
);
