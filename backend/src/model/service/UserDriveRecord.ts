export type UserDriveRecordType = {
  type: string;
  recordTime: number;
  writeTime: number;
};

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
