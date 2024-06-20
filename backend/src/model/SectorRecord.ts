import { DriveRecordType, driveRecordTamplate } from "@model/DriveRecord";

export interface SectorRecordType {
  _id: string;
  id: string;
  hostId: string;

  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;

  driveRecordList: DriveRecordType[];
}

export default class SectorRecord implements SectorRecordType {
  _id: string;
  id: string;
  hostId: string;

  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;

  driveRecordList: DriveRecordType[];

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

export const defaultOrder = 501;
export const defaultRemainingContestTime = 300000;

export const sectorRecordTamplate: SectorRecordType = new SectorRecord({
  _id: "",
  id: "",
  hostId: "",
  contestSector: "",
  order: defaultOrder,
  remainingContestTime: defaultRemainingContestTime,
  sectorState: "ready",
  driveRecordList: [driveRecordTamplate],
});
