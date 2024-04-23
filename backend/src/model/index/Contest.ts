import { ParticipantType } from "./Participant";

export type ContestType = {
  title: string;
  curParticipantId: string;
  nextParticipantId: string;
  contestTimerStartTime: number;
  driveStartTime: number;
  participantList: ParticipantType[];
};

export default class Contest {
  title: string;
  curParticipantId: string;
  nextParticipantId: string;
  contestTimerStartTime: number;
  driveStartTime: number;
  participantList: ParticipantType[];

  constructor(data: ContestType) {
    this.title = data.title;
    this.curParticipantId = data.curParticipantId;
    this.nextParticipantId = data.nextParticipantId;
    this.contestTimerStartTime = data.contestTimerStartTime;
    this.driveStartTime = data.driveStartTime;
    this.participantList = data.participantList;
  }
}
