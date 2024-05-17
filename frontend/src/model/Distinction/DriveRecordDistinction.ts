import { DriveRecordType } from "model/DriveRecord";

export interface DriveRecordDistinctionType
  extends Omit<DriveRecordType, "id" | "hostId" | "writeTime"> {
  type: string;
  recordTime: number;
}

export default class DriveRecordDistinction {
  type: string;
  recordTime: number;

  constructor(data: DriveRecordDistinctionType) {
    this.type = data.type;
    this.recordTime = data.recordTime;
  }
}

export const driveRecordTamplate: DriveRecordDistinctionType =
  new DriveRecordDistinction({
    type: "",
    recordTime: 300000,
  });
