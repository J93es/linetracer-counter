import { ContestType } from "@src/model/Contest";

import { UserParticipantType } from "@src/model/service/user/Participant";

export interface UserContestType
  extends Omit<
    ContestType,
    | "_id"
    | "contestTimerStartTime"
    | "isContestTimerRunning"
    | "driveStartTime"
    | "isDriveTimerRunning"
    | "latestDriveRecordTime"
  > {
  id: string;
  title: string;

  curContestingSection: string;
  curParticipant: object;
  nextParticipant: object;
  curSectorRecord: object;

  participantList: UserParticipantType[];
}

export default class UserContest implements UserContestType {
  id: string;
  title: string;

  curContestingSection: string;
  curParticipant: object;
  nextParticipant: object;
  curSectorRecord: object;

  participantList: UserParticipantType[];

  constructor(data: UserContestType) {
    this.id = data.id;
    this.title = data.title;

    this.curContestingSection = data.curContestingSection;
    this.curParticipant = data.curParticipant;
    this.nextParticipant = data.nextParticipant;
    this.curSectorRecord = data.curSectorRecord;

    this.participantList = data.participantList;
  }
}

export const userContestTamplate: UserContestType = new UserContest({
  id: "",
  title: "",

  curContestingSection: "",
  curParticipant: {},
  nextParticipant: {},
  curSectorRecord: {},

  participantList: [],
});
