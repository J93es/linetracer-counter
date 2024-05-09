import { UserSectorRecordType } from "./UserSectorRecord";

export type UserParticipantType = {
  name: string;
  association: string;
  speech: string;

  sectorRecordList: UserSectorRecordType[];
};

export default class UserParticipant {
  name: string;
  association: string;
  speech: string;

  sectorRecordList: UserSectorRecordType[];

  constructor(data: UserParticipantType) {
    this.name = data.name;
    this.association = data.association;
    this.speech = data.speech;

    this.sectorRecordList = data.sectorRecordList;
  }
}
