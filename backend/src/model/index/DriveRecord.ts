export type DriveRecordType = {
  type: string;
  recordTime: number;
};

export default class DriveRecord {
  type: string;
  recordTime: number;
  constructor(data: DriveRecordType) {
    this.type = data.type;
    this.recordTime = data.recordTime;
  }
}
