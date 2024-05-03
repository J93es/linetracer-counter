import { UserDriveRecordType } from "./UserDriveRecord";

export type UserParticipantRecordType = {
  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;

  driveRecordList: UserDriveRecordType[];
};

export default class UserParticipantRecord {
  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;

  driveRecordList: UserDriveRecordType[];

  constructor(data: UserParticipantRecordType) {
    this.contestSector = data.contestSector;
    this.order = data.order;
    this.remainingContestTime = data.remainingContestTime;
    this.sectorState = data.sectorState;

    this.driveRecordList = data.driveRecordList;
  }
}
