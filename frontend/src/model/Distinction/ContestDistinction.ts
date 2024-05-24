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
  queryId: string;
  title: string;
}

export default class ContestDistinction implements ContestDistinctionType {
  queryId: string;
  title: string;

  constructor(data: ContestDistinctionType) {
    this.queryId = data.queryId;
    this.title = data.title;
  }
}

export const contestTamplate: ContestDistinctionType = new ContestDistinction({
  queryId: "",
  title: "",
});
