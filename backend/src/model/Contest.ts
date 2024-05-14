import { ParticipantType } from "./Participant";

export interface ContestType {
  _id: any;
  id: string;
  title: string;

  curContestingSection: string;
  curParticipant: object;
  nextParticipant: object;
  curSectorRecord: object;

  contestTimerStartTime: number;
  isContestTimerRunning: boolean;

  driveStartTime: number;
  isDriveTimerRunning: boolean;
  latestDriveRecordTime: number;

  participantList: any;
}

export default class Contest implements ContestType {
  _id: any;
  id: string;
  title: string;

  curContestingSection: string;
  curParticipant: object;
  nextParticipant: object;
  curSectorRecord: object;

  contestTimerStartTime: number;
  isContestTimerRunning: boolean;

  driveStartTime: number;
  isDriveTimerRunning: boolean;
  latestDriveRecordTime: number;

  participantList: Partial<ParticipantType>[];

  constructor(data: ContestType) {
    this._id = data._id;
    this.id = data.id;
    this.title = data.title;

    this.curContestingSection = data.curContestingSection;
    this.curParticipant = data.curParticipant;
    this.nextParticipant = data.nextParticipant;
    this.curSectorRecord = data.curSectorRecord;

    this.contestTimerStartTime = data.contestTimerStartTime;
    this.isContestTimerRunning = data.isContestTimerRunning;

    this.driveStartTime = data.driveStartTime;
    this.isDriveTimerRunning = data.isDriveTimerRunning;
    this.latestDriveRecordTime = data.latestDriveRecordTime;

    this.participantList = data.participantList;
  }
}
