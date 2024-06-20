import mongoose from "mongoose";

import { ContestType } from "@model/Contest";
import { curContestingSectionEnum } from "@model/enums/index";

const { Schema } = mongoose;

export const contestSchema = new Schema<ContestType>({
  _id: { type: String, readonly: true },
  id: { type: String, unique: true, required: true, readonly: true },
  queryId: { type: String, unique: true, required: true },
  title: { type: String, required: true },

  curContestingSection: {
    type: String,
    enum: curContestingSectionEnum,
  },
  curParticipantId: {
    type: String,
  },
  nextParticipantId: {
    type: String,
  },
  curSectorRecordId: {
    type: String,
  },

  contestTimerStartTime: { type: Number },
  isContestTimerRunning: { type: Boolean },

  driveStartTime: { type: Number },
  isDriveStopWatchRunning: { type: Boolean },
  latestDriveRecordTime: { type: Number },

  participantList: {
    type: [String],
    ref: "ParticipantSchema",
    required: true,
  },
});
