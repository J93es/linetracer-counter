import {
  DriveRecordType,
  driveRecordTamplate,
} from "pages/displayBoard/model/DriveRecord";

export interface SectorRecordType {
  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;

  driveRecordList: DriveRecordType[];
}

export default class SectorRecord implements SectorRecordType {
  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;

  driveRecordList: DriveRecordType[];

  constructor(data: SectorRecordType) {
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
  contestSector: "",
  order: defaultOrder,
  remainingContestTime: defaultRemainingContestTime,
  sectorState: "ready",
  driveRecordList: [driveRecordTamplate],
});
