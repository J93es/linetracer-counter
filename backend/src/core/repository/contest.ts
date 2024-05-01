import { ContestType } from "../../model/Contest";

export interface ContestRepository {
  isExistContest(id: string): Promise<Boolean>;
  createContest(data: ContestType): Promise<any>;
  readContestIndex(): Promise<any>;
  readContest(id: string): Promise<any>;
  readContestWithJoin(
    id: string,
    selectParticipantField: object,
    selectParticipantRecordField: object
  ): Promise<any>;
  readContestWithJoinByYear(
    year: string,
    selectParticipantField: object,
    selectParticipantRecordField: object
  ): Promise<any>;
  updateContest(id: string, data: Partial<ContestType>): Promise<any>;
  deleteContest(id: string): Promise<ContestType>;
  appendParticipantList(id: string, _participantId: any): Promise<any>;
  popParticipantList(id: string, _participantId: any): Promise<any>;
}
