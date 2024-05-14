import { ContestType } from "model/Contest";

export interface ContestDistinctionType
  extends Omit<
    ContestType,
    | "_id"
    | "title"
    | "curContestingSection"
    | "curParticipant"
    | "nextParticipant"
    | "curSectorRecord"
    | "contestTimerStartTime"
    | "isContestTimerRunning"
    | "driveStartTime"
    | "isDriveTimerRunning"
    | "latestDriveRecordTime"
    | "participantList"
  > {
  id: string;
}

export default class ContestDistinction implements ContestDistinctionType {
  id: string;

  constructor(data: ContestDistinctionType) {
    this.id = data.id;
  }
}

export const contestTamplate: ContestDistinctionType = new ContestDistinction({
  id: "",
});
