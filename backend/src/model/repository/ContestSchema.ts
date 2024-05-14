import mongoose from "mongoose";

import { ContestType } from "@model/Contest";

const { Schema } = mongoose;

const contestSchema = new Schema<ContestType>({
  id: { type: String, unique: true, required: true, readonly: true },
  title: { type: String, required: true },

  curContestingSection: {
    type: String,
    enum: [
      "ready",
      "freshman",
      "expert-STEP--pre",
      "expert-DC--pre",
      "Time-Attack",
      "expert-STEP--main",
      "expert-DC--main",
      "senior",
      "end",
    ],
  },
  curParticipant: {
    type: Schema.Types.ObjectId,
    ref: "ParticipantSchema",
    required: true,
  },
  nextParticipant: {
    type: Schema.Types.ObjectId,
    ref: "ParticipantSchema",
    required: true,
  },
  curSectorRecord: {
    type: Schema.Types.ObjectId,
    ref: "SectorRecordSchema",
    required: true,
  },

  contestTimerStartTime: { type: Number },
  isContestTimerRunning: { type: Boolean },

  driveStartTime: { type: Number },
  isDriveTimerRunning: { type: Boolean },
  latestDriveRecordTime: { type: Number },

  participantList: {
    type: [Schema.Types.ObjectId],
    ref: "ParticipantSchema",
    required: true,
  },
});

export const ContestSchema = mongoose.model("ContestSchema", contestSchema);
