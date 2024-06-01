import { ParticipantType } from "@model/Participant";
import { UserParticipantType } from "@model/service/user/Participant";
import { SectorRecordType } from "@model/SectorRecord";
import { UserSectorRecordType } from "@model/service/user/SectorRecord";

export interface ContestType {
  _id: string;
  id: string;
  queryId: string;
  title: string;

  curContestingSection?: string;
  curParticipant?: ParticipantType | UserParticipantType | string;
  nextParticipant?: ParticipantType | UserParticipantType | string;
  curSectorRecord?: SectorRecordType | UserSectorRecordType | string;

  contestTimerStartTime?: number;
  isContestTimerRunning?: boolean;

  driveStartTime?: number;
  isDriveStopWatchRunning?: boolean;
  latestDriveRecordTime?: number;

  participantList: ParticipantType[] | UserParticipantType[] | string[];
}

export default class Contest implements ContestType {
  _id: string;
  id: string;
  queryId: string;
  title: string;

  curContestingSection?: string;
  curParticipant?: ParticipantType | UserParticipantType | string;
  nextParticipant?: ParticipantType | UserParticipantType | string;
  curSectorRecord?: SectorRecordType | UserSectorRecordType | string;

  contestTimerStartTime?: number;
  isContestTimerRunning?: boolean;

  driveStartTime?: number;
  isDriveStopWatchRunning?: boolean;
  latestDriveRecordTime?: number;

  participantList: ParticipantType[] | UserParticipantType[] | string[];

  constructor(data: ContestType) {
    this._id = data._id;
    this.id = data.id;
    this.queryId = data.queryId;
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
