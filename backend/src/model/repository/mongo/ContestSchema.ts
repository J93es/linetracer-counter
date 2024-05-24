import mongoose from "mongoose";

import { ContestType } from "@model/Contest";

const { Schema } = mongoose;

export const contestSchema = new Schema<ContestType>({
  _id: { type: String, readonly: true },
  id: { type: String, unique: true, required: true, readonly: true },
  queryId: { type: String, required: true },
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
    type: String,
    ref: "ParticipantSchema",
  },
  nextParticipant: {
    type: String,
    ref: "ParticipantSchema",
  },
  curSectorRecord: {
    type: String,
    ref: "SectorRecordSchema",
  },

  contestTimerStartTime: { type: Number },
  isContestTimerRunning: { type: Boolean },

  driveStartTime: { type: Number },
  isDriveTimerRunning: { type: Boolean },
  latestDriveRecordTime: { type: Number },

  participantList: {
    type: [String],
    ref: "ParticipantSchema",
    required: true,
  },
});
