import { UserDriveRecordType } from "./UserDriveRecord";

export type UserSectorRecordType = {
  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;

  driveRecordList: UserDriveRecordType[];
};

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
