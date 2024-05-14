import { DriveRecordType } from "model/DriveRecord";

export interface DriveRecordDistinctionType
  extends Omit<DriveRecordType, "_id"> {
  type: string;
  recordTime: number;
  writeTime: number;
}

export default class DriveRecordDistinction {
  type: string;
  recordTime: number;
  writeTime: number;

  constructor(data: DriveRecordDistinctionType) {
    this.type = data.type;
    this.recordTime = data.recordTime;
    this.writeTime = data.writeTime;
  }
}

export const driveRecordTamplate: DriveRecordDistinctionType =
  new DriveRecordDistinction({
    type: "",
    recordTime: 300000,
    writeTime: Date.now(),
  });
