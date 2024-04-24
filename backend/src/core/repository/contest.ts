import { ContestType } from "../../model/Contest";

export interface ContestRepository {
  createContest(data: object): Promise<any>;
  readContest(filter: object): Promise<any>;
  readContestWithParticipant(filter: object): Promise<any>;
  updateContest(filter: object, data: Partial<ContestType>): Promise<any>;
  deleteContest(filter: object): Promise<any>;
  appendParticipantList(filter: object, participantId: any): Promise<any>;
  removeParticipantList(filter: object, participantId: any): Promise<any>;
}
