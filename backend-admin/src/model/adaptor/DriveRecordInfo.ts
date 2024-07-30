import { DriveRecordType } from "@model/DriveRecord";

export interface DriveRecordInfoType {
  type: string;
  recordTime: number;
  writeTime: number;
}

export default class DriveRecordInfo implements DriveRecordInfoType {
  type: string;
  recordTime: number;
  writeTime: number;

  constructor(data: DriveRecordType) {
    this.type = data.type;
    this.recordTime = data.recordTime;
    this.writeTime = data.writeTime;
  }
}
