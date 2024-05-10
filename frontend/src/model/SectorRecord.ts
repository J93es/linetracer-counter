import { DriveRecordType, driveRecordTamplate } from "model/DriveRecord";

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
    this.order = data.order;
    this.remainingContestTime = data.remainingContestTime;
    this.sectorState = data.sectorState;

    this.driveRecordList = data.driveRecordList;
  }
}

export const defaultOrder = 501;
export const defaultRemainingContestTime = 300000;

export const SectorRecordTamplate: SectorRecordType = new SectorRecord({
  _id: "",
  hostId: "",
  contestSector: "",
  order: defaultOrder,
  remainingContestTime: defaultRemainingContestTime,
  sectorState: "ready",
  driveRecordList: [driveRecordTamplate],
});
