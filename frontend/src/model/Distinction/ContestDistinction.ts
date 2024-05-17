import { ContestType } from "model/Contest";

export interface ContestDistinctionType
  extends Omit<
    ContestType,
    | "id"
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
  title: string;
}

export default class ContestDistinction implements ContestDistinctionType {
  title: string;

  constructor(data: ContestDistinctionType) {
    this.title = data.title;
  }
}

export const contestTamplate: ContestDistinctionType = new ContestDistinction({
  title: "",
});
