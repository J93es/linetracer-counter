export type ContestStatusType = {
  remainingContestTime: number;
  driveRecord: Array<any>;
};

export default class ContestStatus {
  remainingContestTime: number;
  driveRecord: Array<any>;

  constructor(data: ContestStatusType) {
    this.remainingContestTime = data.remainingContestTime; //ms
    this.driveRecord = data.driveRecord;
  }
}
