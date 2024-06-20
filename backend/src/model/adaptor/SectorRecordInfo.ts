import { DriveRecordType, driveRecordTamplate } from "@model/DriveRecord";

export interface SectorRecordInfoType {
  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;
}

export default class SectorRecord implements SectorRecordInfoType {
  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;

  constructor(data: SectorRecordInfoType) {
    this.contestSector = data.contestSector;
    this.remainingContestTime = data.remainingContestTime;
    this.order = data.order;
    this.sectorState = data.sectorState;
  }
}

export const defaultOrder = 501;
export const defaultRemainingContestTime = 300000;

export const sectorRecordTamplate: SectorRecordInfoType = new SectorRecord({
  contestSector: "",
  order: defaultOrder,
  remainingContestTime: defaultRemainingContestTime,
  sectorState: "ready",
});
