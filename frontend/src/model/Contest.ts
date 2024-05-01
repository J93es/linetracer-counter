import { ParticipantType, participantTamplate } from "./Participant";

export type ContestType = {
  _id: any;
  id: string;
  title: string;

  curContestingSection: string;
  curParticipant: any;
  nextParticipant: any;

  contestTimerStartTime: number;
  driveStartTime: number;

  participantList: ParticipantType[];
};

export default class Contest {
  _id: any;
  id: string;
  title: string;

  curContestingSection: string;
  curParticipant: any;
  nextParticipant: any;

  contestTimerStartTime: number;
  driveStartTime: number;

  participantList: ParticipantType[];

  constructor(data: ContestType) {
    this._id = data._id;
    this.id = data.id;
    this.title = data.title;

    this.curContestingSection = data.curContestingSection;
    this.curParticipant = data.curParticipant;
    this.nextParticipant = data.nextParticipant;

    this.contestTimerStartTime = data.contestTimerStartTime;
    this.driveStartTime = data.driveStartTime;

    this.participantList = data.participantList;
  }
}

export const contestTamplate: ContestType = new Contest({
  _id: "",
  id: "",
  title: "",

  curContestingSection: "",
  curParticipant: null,
  nextParticipant: null,

  contestTimerStartTime: 0,
  driveStartTime: 0,
  participantList: [participantTamplate],
});
