import { DriveRecordType } from "./DriveRecord";

export type SectorRecordType = {
  _id: any;
  hostId: any;

  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;

  driveRecordList: DriveRecordType[];
};

export default class SectorRecord {
  _id: any;
  hostId: any;

  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;

  driveRecordList: DriveRecordType[];

  constructor(data: SectorRecordType) {
    this._id = data._id;
    this.hostId = data.hostId;

    this.contestSector = data.contestSector;
    this.remainingContestTime = data.remainingContestTime;
    this.order = data.order;
    this.sectorState = data.sectorState;

    this.driveRecordList = data.driveRecordList;
  }
}
