import { DriveRecordType } from "./DriveRecord";

export type ParticipantRecordType = {
  _id: any;
  hostId: any;

  contestSector: string;
  order: number;
  remainingContestTime: number;

  driveRecordList: DriveRecordType[];
};

export default class ParticipantRecord {
  _id: any;
  hostId: any;

  contestSector: string;
  order: number;
  remainingContestTime: number;

  driveRecordList: DriveRecordType[];

  constructor(data: ParticipantRecordType) {
    this._id = data._id;
    this.hostId = data.hostId;

    this.contestSector = data.contestSector;
    this.remainingContestTime = data.remainingContestTime;
    this.order = data.order;

    this.driveRecordList = data.driveRecordList;
  }
}
