import { DriveRecordType } from "@model/DriveRecord";

export interface UserDriveRecordType extends Omit<DriveRecordType, "_id"> {
  type: string;
  recordTime: number;
  writeTime: number;
}

export default class UserDriveRecord {
  type: string;
  recordTime: number;
  writeTime: number;

  constructor(data: UserDriveRecordType) {
    this.type = data.type;
    this.recordTime = data.recordTime;
    this.writeTime = data.writeTime;
  }
}

export const userDriveRecordTamplate: UserDriveRecordType = new UserDriveRecord(
  {
    type: "",
    recordTime: 300000,
    writeTime: Date.now(),
  }
);
