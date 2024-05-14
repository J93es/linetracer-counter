import { ParticipantType } from "@model/Participant";

export interface ParticipantRepository {
  isExist(_id: any): Promise<Boolean>;
  create(data: ParticipantType): Promise<any>;
  readEvery(contest_Id: any): Promise<any>;
  read(_id: any): Promise<any>;
  readWithJoin(_id: any, selectField: object): Promise<any>;
  update(data: Partial<ParticipantType>): Promise<any>;
  delete(_id: any): Promise<any>;
  appendSectorRecordList(_id: any, sectorRecord_Id: any): Promise<any>;
  popSectorRecordList(_id: any, sectorRecord_Id: any): Promise<any>;
}
