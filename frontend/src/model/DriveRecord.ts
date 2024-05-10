export type DriveRecordType = {
  _id: any;
  type: string;
  recordTime: number;
};

export default class DriveRecord {
  _id: any;
  type: string;
  recordTime: number;

  constructor(data: DriveRecordType) {
    this._id = data._id;
    this.type = data.type;
    this.recordTime = data.recordTime;
  }
}

export const driveRecordTamplate: DriveRecordType = new DriveRecord({
  _id: "",
  type: "",
  recordTime: 0,
});
