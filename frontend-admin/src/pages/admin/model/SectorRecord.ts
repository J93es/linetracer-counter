import {
  DriveRecordType,
  driveRecordTamplate,
} from "pages/admin/model/DriveRecord";

export interface SectorRecordType {
  id: string;
  hostId: string;

  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;

  driveRecordList: DriveRecordType[];
}

export default class SectorRecord implements SectorRecordType {
  id: string;
  hostId: string;

  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;

  driveRecordList: DriveRecordType[];

  constructor(data: SectorRecordType) {
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
  id: "",
  hostId: "",
  contestSector: "",
  order: defaultOrder,
  remainingContestTime: defaultRemainingContestTime,
  sectorState: "ready",
  driveRecordList: [driveRecordTamplate],
});
