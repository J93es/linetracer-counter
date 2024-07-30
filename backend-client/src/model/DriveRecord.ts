export interface DriveRecordType {
  _id: string;
  id: string;
  hostId: string;
  type: string;
  recordTime: number;
  writeTime: number;
}

export default class DriveRecord implements DriveRecordType {
  _id: string;
  id: string;
  hostId: string;
  type: string;
  recordTime: number;
  writeTime: number;

  constructor(data: DriveRecordType) {
    this._id = data._id;
    this.id = data.id;
    this.hostId = data.hostId;
    this.type = data.type;
    this.recordTime = data.recordTime;
    this.writeTime = data.writeTime;
  }
}

export const driveRecordTamplate: DriveRecordType = new DriveRecord({
  _id: "",
  id: "",
  hostId: "",
  type: "",
  recordTime: 0,
  writeTime: 0,
});
