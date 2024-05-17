import { DriveRecordType } from "@model/DriveRecord";
import { UserDriveRecordType } from "@model/service/user/DriveRecord";

export interface SectorRecordType {
  _id: string;
  id: string;
  hostId: string;

  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;

  driveRecordList: DriveRecordType[] | UserDriveRecordType[] | string[];
}

export default class SectorRecord implements SectorRecordType {
  _id: string;
  id: string;
  hostId: string;

  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;

  driveRecordList: DriveRecordType[] | UserDriveRecordType[] | string[];

  constructor(data: SectorRecordType) {
    this._id = data._id;
    this.id = data.id;
    this.hostId = data.hostId;

    this.contestSector = data.contestSector;
    this.remainingContestTime = data.remainingContestTime;
    this.order = data.order;
    this.sectorState = data.sectorState;

    this.driveRecordList = data.driveRecordList;
  }
}
