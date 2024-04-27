import { UserDriveRecordType } from "./UserDriveRecord";

export type UserParticipantRecordType = {
  contestSector: string;
  order: number;
  remainingContestTime: number;

  driveRecordList: UserDriveRecordType[];
};

export default class UserParticipantRecord {
  contestSector: string;
  order: number;
  remainingContestTime: number;

  driveRecordList: UserDriveRecordType[];

  constructor(data: UserParticipantRecordType) {
    this.contestSector = data.contestSector;
    this.remainingContestTime = data.remainingContestTime;

    this.order = data.order;

    this.driveRecordList = data.driveRecordList;
  }
}
