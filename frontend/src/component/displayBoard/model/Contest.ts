import { ParticipantInfoType } from "component/displayBoard/model/ParticipantInfo";
import { SectorRecordType } from "component/displayBoard/model/SectorRecord";

export interface ContestType {
  title: string;

  curContestingSection?: string;
  curParticipant?: ParticipantInfoType;
  nextParticipant?: ParticipantInfoType;
  curSectorRecord?: SectorRecordType;

  contestTimerStartTime?: number;
  isContestTimerRunning?: boolean;

  driveStartTime?: number;
  isDriveStopWatchRunning?: boolean;
  latestDriveRecordTime?: number;

  participantInfoList: ParticipantInfoType[];
}

export default class Contest implements ContestType {
  title: string;

  curContestingSection?: string;
  curParticipant?: ParticipantInfoType;
  nextParticipant?: ParticipantInfoType;
  curSectorRecord?: SectorRecordType;

  contestTimerStartTime?: number;
  isContestTimerRunning?: boolean;

  driveStartTime?: number;
  isDriveStopWatchRunning?: boolean;
  latestDriveRecordTime?: number;

  participantInfoList: ParticipantInfoType[];

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

    this.participantInfoList = data.participantInfoList;
  }
}
