import { ParticipantType } from "../../model/Participant";

export interface ParticipantRepository {
  isExistParticipant(_id: any): Promise<Boolean>;
  createParticipant(data: ParticipantType): Promise<any>;
  readEveryParticipant(contest_Id: any): Promise<any>;
  readParticipant(_id: any): Promise<any>;
  readParticipantWithJoin(_id: any, selectField: object): Promise<any>;
  updateParticipant(data: Partial<ParticipantType>): Promise<any>;
  deleteParticipant(_id: any): Promise<any>;
  appendSectorRecordList(_id: any, sectorRecord_Id: any): Promise<any>;
  popSectorRecordList(_id: any, sectorRecord_Id: any): Promise<any>;
}
