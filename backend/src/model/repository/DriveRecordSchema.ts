import mongoose from "mongoose";

const { Schema } = mongoose;

export const driveRecordSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["Ignored", "Line-Out", "Pit-In-KO", "SUCCESS"],
  },
  recordTime: { type: Number, required: true },
});

export const DriveRecordSchema = mongoose.model(
  "DriveRecordSchema",
  driveRecordSchema
);
