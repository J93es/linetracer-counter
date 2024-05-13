export type DriveRecordDistinctionType = {
  // _id: string;
  type: string;
  recordTime: number;
  writeTime: number;
};

export default class DriveRecordDistinction {
  // _id: string;
  type: string;
  recordTime: number;
  writeTime: number;

  constructor(data: DriveRecordDistinctionType) {
    // this._id = data._id;
    this.type = data.type;
    this.recordTime = data.recordTime;
    this.writeTime = data.writeTime;
  }
}

export const driveRecordTamplate: DriveRecordDistinctionType =
  new DriveRecordDistinction({
    // _id: "",
    type: "",
    recordTime: 300000,
    writeTime: Date.now(),
  });
