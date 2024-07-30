import { ParticipantType } from "@model/Participant";

export interface ParticipantRepository {
  isExist(id: string): Promise<Boolean>;
  create(data: Partial<ParticipantType>): Promise<ParticipantType>;
  read(id: string): Promise<ParticipantType>;
  readWithJoin(id: string, selectField: object): Promise<ParticipantType>;
  update(data: Partial<ParticipantType>): Promise<ParticipantType>;
  delete(id: string): Promise<ParticipantType>;
  appendSectorRecordList(
    id: string,
    sectorRecordId: string
  ): Promise<ParticipantType>;
  popSectorRecordList(
    id: string,
    sectorRecordId: string
  ): Promise<ParticipantType>;
}
