import {
  ParticipantType,
  participantTamplate,
} from "pages/admin/model/Participant";

export interface ContestType {
  id: string;
  queryId: string;
  title: string;

  curContestingSection?: string;
  curParticipantId?: string;
  nextParticipantId?: string;
  curSectorRecordId?: string;

  contestTimerStartTime?: number;
  isContestTimerRunning?: boolean;

  driveStartTime?: number;
  isDriveStopWatchRunning?: boolean;
  latestDriveRecordTime?: number;

  participantList: ParticipantType[];
}

export default class Contest implements ContestType {
  id: string;
  queryId: string;
  title: string;

  curContestingSection?: string;
  curParticipantId?: string;
  nextParticipantId?: string;
  curSectorRecordId?: string;

  contestTimerStartTime?: number;
  isContestTimerRunning?: boolean;

  driveStartTime?: number;
  isDriveStopWatchRunning?: boolean;
  latestDriveRecordTime?: number;

  participantList: ParticipantType[];

  constructor(data: ContestType) {
    this.id = data.id;
    this.queryId = data.queryId;
    this.title = data.title;

    this.curContestingSection = data.curContestingSection;
    this.curParticipantId = data.curParticipantId;
    this.nextParticipantId = data.nextParticipantId;
    this.curSectorRecordId = data.curSectorRecordId;

    this.contestTimerStartTime = data.contestTimerStartTime;
    this.isContestTimerRunning = data.isContestTimerRunning;

    this.driveStartTime = data.driveStartTime;
    this.isDriveStopWatchRunning = data.isDriveStopWatchRunning;
    this.latestDriveRecordTime = data.latestDriveRecordTime;

    this.participantList = data.participantList;
  }
}

export const timerStopValue = -1;

export const contestTamplate: ContestType = new Contest({
  id: "",
  queryId: "",
  title: "",

  curContestingSection: "",
  curParticipantId: "",
  nextParticipantId: "",
  curSectorRecordId: "",

  contestTimerStartTime: timerStopValue,
  isContestTimerRunning: false,

  driveStartTime: timerStopValue,
  isDriveStopWatchRunning: false,
  latestDriveRecordTime: 0,

  participantList: [participantTamplate],
});
