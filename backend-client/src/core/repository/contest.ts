import { ContestType } from "@model/Contest";

export interface ContestRepository {
  readWithJoinByQueryId(
    queryId: string,
    participantJoinTarget: string,
    selectParticipantField: object,
    selectSectorRecordField: object
  ): Promise<ContestType>;
}
