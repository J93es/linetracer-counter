export type UserDriveRecordType = {
  type: string;
  isPreliminary: boolean;
  recordTime: number;
};

export default class UserDriveRecord {
  type: string;
  isPreliminary: boolean;
  recordTime: number;

  constructor(data: UserDriveRecordType) {
    this.type = data.type;
    this.isPreliminary = data.isPreliminary;
    this.recordTime = data.recordTime;
  }
}
