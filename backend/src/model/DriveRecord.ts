export type DriveRecordType = {
  _id: any;
  type: string;
  isPreliminary: boolean;
  recordTime: number;
};

export default class DriveRecord {
  _id: any;
  type: string;
  isPreliminary: boolean;
  recordTime: number;

  constructor(data: DriveRecordType) {
    this._id = data._id;
    this.type = data.type;
    this.isPreliminary = data.isPreliminary;
    this.recordTime = data.recordTime;
  }
}
