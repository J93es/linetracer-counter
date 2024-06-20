export interface DriveRecordType {
  type: string;
  recordTime: number;
  writeTime: number;
}

export default class DriveRecord implements DriveRecordType {
  type: string;
  recordTime: number;
  writeTime: number;

  constructor(data: DriveRecordType) {
    this.type = data.type;
    this.recordTime = data.recordTime;
    this.writeTime = data.writeTime;
  }
}

export const driveRecordTamplate: DriveRecordType = new DriveRecord({
  type: "",
  recordTime: 0,
  writeTime: 0,
});
