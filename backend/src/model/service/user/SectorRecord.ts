import { SectorRecordType } from "@model/SectorRecord";
import { UserDriveRecordType } from "@model/service/user/DriveRecord";

export interface UserSectorRecordType
  extends Omit<SectorRecordType, "_id" | "id" | "hostId"> {
  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;

  driveRecordList: UserDriveRecordType[];
}

export default class UserSectorRecord {
  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;

  driveRecordList: UserDriveRecordType[];

  constructor(data: UserSectorRecordType) {
    this.contestSector = data.contestSector;
    this.order = data.order;
    this.remainingContestTime = data.remainingContestTime;
    this.sectorState = data.sectorState;

    this.driveRecordList = data.driveRecordList;
  }
}

export const userSectorRecordTamplate: UserSectorRecordType =
  new UserSectorRecord({
    contestSector: "",
    order: 0,
    remainingContestTime: 300000,
    sectorState: "ready",

    driveRecordList: [],
  });
