import { ContestType } from "@model/Contest";

export interface ContestRepository {
  isExist(_id: string): Promise<Boolean>;

  create(data: ContestType): Promise<any>;

  readEvery(): Promise<any>;
  read(_id: string): Promise<any>;
  readWithJoin(
    _id: string,
    participantJoinTarget: string,
    selectParticipantField: object,
    selectSectorRecordField: object
  ): Promise<any>;

  readWithJoinById(
    id: string,
    participantJoinTarget: string,
    selectParticipantField: object,
    selectSectorRecordField: object
  ): Promise<any>;

  update(data: Partial<ContestType>): Promise<any>;
  delete(_id: string): Promise<ContestType>;
  appendParticipantList(_id: string, participant_Id: any): Promise<any>;
  popParticipantList(_id: string, participant_Id: any): Promise<any>;
}
