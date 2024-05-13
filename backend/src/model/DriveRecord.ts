export type DriveRecordType = {
  _id: any;
  type: string;
  recordTime: number;
  writeTime: number;
};

export default class DriveRecord {
  _id: any;
  type: string;
  recordTime: number;
  writeTime: number;

  constructor(data: DriveRecordType) {
    this._id = data._id;
    this.type = data.type;
    this.recordTime = data.recordTime;
    this.writeTime = data.writeTime;
  }
}
