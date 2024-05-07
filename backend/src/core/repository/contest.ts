import { ContestType } from "../../model/Contest";

export interface ContestRepository {
  isExistContest(_id: string): Promise<Boolean>;

  createContest(data: ContestType): Promise<any>;

  readEveryContest(): Promise<any>;
  readContest(_id: string): Promise<any>;
  readContestWithJoin(
    _id: string,
    selectParticipantField: object,
    selectParticipantRecordField: object
  ): Promise<any>;

  readContestWithJoinById(
    id: string,
    selectParticipantField: object,
    selectParticipantRecordField: object
  ): Promise<any>;

  updateContest(data: Partial<ContestType>): Promise<any>;
  deleteContest(_id: string): Promise<ContestType>;
  appendParticipantList(_id: string, participant_Id: any): Promise<any>;
  popParticipantList(_id: string, participant_Id: any): Promise<any>;
}
