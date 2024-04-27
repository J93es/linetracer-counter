import { ContestType } from "../../model/index/Contest";

export interface ContestRepository {
  isExistContest(id: string): Promise<Boolean>;
  createContest(data: ContestType): Promise<any>;
  readContest(id: string): Promise<any>;
  readContestWithPopulate(
    id: string,
    selectParticipantField: object,
    selectParticipantRecordField: object
  ): Promise<any>;
  updateContest(id: string, data: Partial<ContestType>): Promise<any>;
  deleteContest(id: string): Promise<ContestType>;
  appendParticipantList(id: string, _participantId: any): Promise<any>;
  popParticipantList(id: string, _participantId: any): Promise<any>;
}
