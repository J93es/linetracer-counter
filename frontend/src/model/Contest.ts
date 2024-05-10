import { ParticipantType, participantTamplate } from "model/Participant";

export type ContestType = {
  _id: any;
  id: string;
  title: string;

  curContestingSection: string;

  contestTimerStartTime: number;
  driveStartTime: number;

  participantList: ParticipantType[];
};

export default class Contest {
  _id: any;
  id: string;
  title: string;

  curContestingSection: string;

  contestTimerStartTime: number;
  driveStartTime: number;

  participantList: ParticipantType[];

  constructor(data: ContestType) {
    this._id = data._id;
    this.id = data.id;
    this.title = data.title;

    this.curContestingSection = data.curContestingSection;

    this.contestTimerStartTime = data.contestTimerStartTime;
    this.driveStartTime = data.driveStartTime;

    this.participantList = data.participantList;
  }
}

export const timerStopValue = -1;

export const contestTamplate: ContestType = new Contest({
  _id: "",
  id: "",
  title: "",

  curContestingSection: "",

  contestTimerStartTime: timerStopValue,
  driveStartTime: timerStopValue,
  participantList: [participantTamplate],
});