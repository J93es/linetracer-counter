import { ParticipantType } from "pages/body/live/model/Participant";

export interface ContestType {
  title: string;
  curContestingSection?: string;
  curParticipant?: ParticipantType;
  participantListContainer: any;
}

export default class Contest implements ContestType {
  title: string;
  curContestingSection?: string;
  curParticipant?: ParticipantType;
  participantListContainer: any;

  constructor(data: ContestType) {
    this.title = data.title;
    this.curContestingSection = data.curContestingSection;
    this.curParticipant = data.curParticipant;
    this.participantListContainer = data.participantListContainer;
  }
}
