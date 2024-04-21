export type ParticipantType = {
  id: string;
  title: string;
  contestLog: Array<any>;
  driveLog: Array<any>;
  remainingContestTime: number;
};

export default class Participant {
  id: string;
  title: string;
  contestLog: Array<any>;
  driveLog: Array<any>;
  remainingContestTime: number;

  constructor(data: ParticipantType) {
    this.id = data.id;
    this.title = data.title;
    this.contestLog = data.contestLog;
    this.driveLog = data.driveLog;
    this.remainingContestTime = data.remainingContestTime; //ms
  }
}
