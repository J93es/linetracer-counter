import { UserDriveRecordType } from "./UserDriveRecord";

export type UserParticipantType = {
  name: string;
  association: string;

  contestYear: number;
  contestSector: string;

  preliminaryOrder: number;
  mainOrder: number;

  driveRecord: UserDriveRecordType[];
};

export default class UserParticipant {
  name: string;
  association: string;

  contestYear: number;
  contestSector: string;

  preliminaryOrder: number;
  mainOrder: number;

  driveRecord: UserDriveRecordType[];

  constructor(data: UserParticipantType) {
    this.name = data.name;
    this.association = data.association;

    this.contestYear = data.contestYear;
    this.contestSector = data.contestSector;

    this.preliminaryOrder = data.preliminaryOrder;
    this.mainOrder = data.mainOrder;

    this.driveRecord = data.driveRecord;
  }
}
