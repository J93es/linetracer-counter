import { ParticipantType, participantTamplate } from "model/Participant";

export type ContestType = {
  _id: any;
  id: string;
  title: string;

  curContestingSection: string;
  curParticipnatId: string;
  curSectorRecordId: string;

  contestTimerStartTime: number;
  isContestTimerRunning: boolean;

  driveStartTime: number;
  isDriveTimerRunning: boolean;
  latestDriveRecordTime: number;

  participantList: ParticipantType[];
};

export default class Contest {
  _id: any;
  id: string;
  title: string;

  curContestingSection: string;
  curParticipnatId: string;
  curSectorRecordId: string;

  contestTimerStartTime: number;
  isContestTimerRunning: boolean;

  driveStartTime: number;
  isDriveTimerRunning: boolean;
  latestDriveRecordTime: number;

  participantList: ParticipantType[];

  constructor(data: ContestType) {
    this._id = data._id;
    this.id = data.id;
    this.title = data.title;

    this.curContestingSection = data.curContestingSection;
    this.curParticipnatId = data.curParticipnatId;
    this.curSectorRecordId = data.curSectorRecordId;

    this.contestTimerStartTime = data.contestTimerStartTime;
    this.isContestTimerRunning = data.isContestTimerRunning;

    this.driveStartTime = data.driveStartTime;
    this.isDriveTimerRunning = data.isDriveTimerRunning;
    this.latestDriveRecordTime = data.latestDriveRecordTime;

    this.participantList = data.participantList;
  }
}

export const timerStopValue = -1;

export const contestTamplate: ContestType = new Contest({
  _id: "",
  id: "",
  title: "",

  curContestingSection: "",
  curParticipnatId: "",
  curSectorRecordId: "",

  contestTimerStartTime: timerStopValue,
  isContestTimerRunning: false,

  driveStartTime: timerStopValue,
  isDriveTimerRunning: false,
  latestDriveRecordTime: 0,

  participantList: [participantTamplate],
});
