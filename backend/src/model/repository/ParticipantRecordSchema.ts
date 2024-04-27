import mongoose from "mongoose";

const { Schema } = mongoose;

const driveRecordSchema = new Schema({
  type: { type: String, required: true },
  recordTime: { type: Number, required: true },
});

const participantRecordSchema = new Schema({
  hostId: { type: String, required: true, readonly: true },

  contestSector: { type: String, required: true },
  order: { type: Number, required: true },
  remainingContestTime: { type: Number, required: true },

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
