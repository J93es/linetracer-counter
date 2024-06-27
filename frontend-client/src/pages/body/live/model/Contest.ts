import { ParticipantType } from "pages/body/live/model/Participant";

export interface ContestType {
  title: string;

  curContestingSection?: string;
  curParticipant?: ParticipantType;
  nextParticipant?: ParticipantType;

  participantListContainer: any;
}

export default class Contest implements ContestType {
  title: string;

  curContestingSection?: string;
  curParticipant?: ParticipantType;
  nextParticipant?: ParticipantType;

  participantListContainer: any;

  constructor(data: ContestType) {
    this.title = data.title;

    this.curContestingSection = data.curContestingSection;

    this.curParticipant = data.curParticipant;
    this.nextParticipant = data.nextParticipant;

    this.participantListContainer = data.participantListContainer;
  }
}
