import mongoose, { Mongoose } from "mongoose";

const { Schema } = mongoose;

const contestSchema = new Schema({
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
  curParticipant: { type: Schema.Types.ObjectId, ref: "ParticipantSchema" },
  nextParticipant: { type: Schema.Types.ObjectId, ref: "ParticipantSchema" },

  contestTimerStartTime: { type: Number },
  driveStartTime: { type: Number },

  participantList: {
    type: [Schema.Types.ObjectId],
    ref: "ParticipantSchema",
    required: true,
  },
});

export const ContestSchema = mongoose.model("ContestSchema", contestSchema);
