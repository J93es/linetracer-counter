export type ContestType = {
  _id: any;
  idYear: string;
  title: string;

  curContestingSection: string;
  curParticipantId: any;
  nextParticipantId: any;

  contestTimerStartTime: number;
  driveStartTime: number;

  participantList: any[];
};

export default class Contest {
  _id: any;
  idYear: string;
  title: string;

  curContestingSection: string;
  curParticipantId: any;
  nextParticipantId: any;

  contestTimerStartTime: number;
  driveStartTime: number;

  participantList: any[];

  constructor(data: ContestType) {
    this._id = data._id;
    this.idYear = data.idYear;
    this.title = data.title;

    this.curContestingSection = data.curContestingSection;
    this.curParticipantId = data.curParticipantId;
    this.nextParticipantId = data.nextParticipantId;

    this.contestTimerStartTime = data.contestTimerStartTime;
    this.driveStartTime = data.driveStartTime;

    this.participantList = data.participantList;
  }
}
