import { ContestType } from "@model/Contest";

export interface ContestRepository {
  isExist(id: string): Promise<Boolean>;

  create(data: ContestType): Promise<ContestType>;

  readEvery(): Promise<ContestType[]>;
  read(id: string): Promise<ContestType>;
  readWithJoin(
    id: string,
    participantJoinTarget: string,
    selectParticipantField: object,
    selectSectorRecordField: object
  ): Promise<ContestType>;

  readWithJoinByQuery(
    query: string,
    participantJoinTarget: string,
    selectParticipantField: object,
    selectSectorRecordField: object
  ): Promise<ContestType>;

  update(data: Partial<ContestType>): Promise<ContestType>;
  delete(id: string): Promise<ContestType>;
  appendParticipantList(
    id: string,
    participantId: string
  ): Promise<ContestType>;
  popParticipantList(id: string, participantId: string): Promise<ContestType>;
}
