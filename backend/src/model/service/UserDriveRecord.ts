export type UserDriveRecordType = {
  type: string;
  recordTime: number;
};

export default class UserDriveRecord {
  type: string;
  recordTime: number;

  constructor(data: UserDriveRecordType) {
    this.type = data.type;
    this.recordTime = data.recordTime;
  }
}
