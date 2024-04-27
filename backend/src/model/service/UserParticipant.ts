import { UserParticipantRecordType } from "./UserParticipantRecord";

export type UserParticipantType = {
  name: string;
  association: string;
  speech: string;

  participantRecordList: UserParticipantRecordType[];
};

export default class UserParticipant {
  name: string;
  association: string;
  speech: string;

  participantRecordList: UserParticipantRecordType[];

  constructor(data: UserParticipantType) {
    this.name = data.name;
    this.association = data.association;
    this.speech = data.speech;

    this.participantRecordList = data.participantRecordList;
  }
}
