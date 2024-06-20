export interface DriveRecordType {
  id: string;
  hostId: string;
  type: string;
  recordTime: number;
  writeTime: number;
}

export default class DriveRecord implements DriveRecordType {
  id: string;
  hostId: string;
  type: string;
  recordTime: number;
  writeTime: number;

  constructor(data: DriveRecordType) {
    this.id = data.id;
    this.hostId = data.hostId;
    this.type = data.type;
    this.recordTime = data.recordTime;
    this.writeTime = data.writeTime;
  }
}

export const driveRecordTamplate: DriveRecordType = new DriveRecord({
  id: "",
  hostId: "",
  type: "",
  recordTime: 0,
  writeTime: 0,
});
