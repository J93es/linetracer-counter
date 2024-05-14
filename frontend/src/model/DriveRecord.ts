export interface DriveRecordType {
  _id: any;
  type: string;
  recordTime: number;
  writeTime: number;
}

export default class DriveRecord implements DriveRecordType {
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

export const driveRecordTamplate: DriveRecordType = new DriveRecord({
  _id: "",
  type: "",
  recordTime: 0,
  writeTime: 0,
});
