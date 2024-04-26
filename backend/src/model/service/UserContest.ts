import { UserParticipantType } from "./UserParticipant";

export type UserContestType = {
  id: string;
  title: string;

  curContestingSection: string;
  curParticipant: any;
  nextParticipant: any;

  participantList: UserParticipantType[];
};

export default class UserContest {
  id: string;
  title: string;

  curContestingSection: string;
  curParticipant: any;
  nextParticipant: any;

  participantList: UserParticipantType[];

  constructor(data: UserContestType) {
    this.id = data.id;
    this.title = data.title;

    this.curContestingSection = data.curContestingSection;
    this.curParticipant = data.curParticipant;
    this.nextParticipant = data.nextParticipant;

    this.participantList = data.participantList;
  }
}
