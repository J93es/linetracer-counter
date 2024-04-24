import mongoose, { Mongoose } from "mongoose";

const { Schema } = mongoose;

const contestSchema = new Schema({
  idYear: { type: String, required: true },
  title: { type: String, required: true },

  curContestingSection: { type: String },
  curParticipantId: { type: Schema.Types.ObjectId },
  nextParticipantId: { type: Schema.Types.ObjectId },

  contestTimerStartTime: { type: Number },
  driveStartTime: { type: Number },

  participantList: {
    type: [Schema.Types.ObjectId],
    ref: "ParticipantSchema",
    required: true,
  },
});

export const ContestSchema = mongoose.model("ContestSchema", contestSchema);
