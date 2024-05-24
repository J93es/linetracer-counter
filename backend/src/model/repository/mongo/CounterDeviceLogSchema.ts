import mongoose from "mongoose";

import { CounterDeviceLogType } from "@model/CounterDeviceLog";

const { Schema } = mongoose;

export const counterDeviceLogSchema = new Schema<CounterDeviceLogType>({
  _id: { type: String, readonly: true },
  id: { type: String, unique: true, required: true, readonly: true },
  hostId: { type: String, required: true, readonly: true },

  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  type: {
    type: String,
    required: true,
    enum: ["Ignored", "Line-Out", "Pit-In-KO", "SUCCESS"],
  },
  recordTime: { type: Number, required: true },
  writeTime: { type: Number, required: true },
});

export const CounterDeviceLogSchema = mongoose.model(
  "CounterDeviceLogSchema",
  counterDeviceLogSchema
);
