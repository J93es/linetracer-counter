import { UserParticipantType } from "./UserParticipant";

export type UserContestType = {
  id: string;
  title: string;

  curContestingSection: string;

  participantList: UserParticipantType[];
};

export default class UserContest {
  id: string;
  title: string;

  curContestingSection: string;

  participantList: UserParticipantType[];

  constructor(data: UserContestType) {
    this.id = data.id;
    this.title = data.title;

    this.curContestingSection = data.curContestingSection;

    this.participantList = data.participantList;
  }
}
