import { UserParticipantType } from "./UserParticipant";

export type UserContestType = {
  title: string;

  curContestingSection: string;
  curParticipantId: any;
  nextParticipantId: any;

  participantList: UserParticipantType[];
};

export default class UserContest {
  title: string;

  curContestingSection: string;
  curParticipantId: any;
  nextParticipantId: any;

  participantList: UserParticipantType[];

  constructor(data: UserContestType) {
    this.title = data.title;

    this.curContestingSection = data.curContestingSection;
    this.curParticipantId = data.curParticipantId;
    this.nextParticipantId = data.nextParticipantId;

    this.participantList = data.participantList;
  }
}
