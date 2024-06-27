import { ParticipantType } from "pages/display_board/model/Participant";
import { SectorRecordType } from "pages/display_board/model/SectorRecord";

export interface ContestType {
  title: string;

  curContestingSection?: string;
  curParticipant?: ParticipantType;
  nextParticipant?: ParticipantType;
  curSectorRecord?: SectorRecordType;

  contestTimerStartTime?: number;
  isContestTimerRunning?: boolean;

  driveStartTime?: number;
  isDriveStopWatchRunning?: boolean;
  latestDriveRecordTime?: number;

  participantList: ParticipantType[];
}

export default class Contest implements ContestType {
  title: string;

  curContestingSection?: string;
  curParticipant?: ParticipantType;
  nextParticipant?: ParticipantType;
  curSectorRecord?: SectorRecordType;

  contestTimerStartTime?: number;
  isContestTimerRunning?: boolean;

  driveStartTime?: number;
  isDriveStopWatchRunning?: boolean;
  latestDriveRecordTime?: number;

  participantList: ParticipantType[];

  constructor(data: ContestType) {
    this.title = data.title;

    this.curContestingSection = data.curContestingSection;

    this.curParticipant = data.curParticipant;
    this.nextParticipant = data.nextParticipant;
    this.curSectorRecord = data.curSectorRecord;

    this.contestTimerStartTime = data.contestTimerStartTime;
    this.isContestTimerRunning = data.isContestTimerRunning;

    this.driveStartTime = data.driveStartTime;
    this.isDriveStopWatchRunning = data.isDriveStopWatchRunning;
    this.latestDriveRecordTime = data.latestDriveRecordTime;

    this.participantList = data.participantList;
  }
}
