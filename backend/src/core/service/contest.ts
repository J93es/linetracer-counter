import { ContestType } from "../../model/Contest";

export interface ContestServiceInterface {
  postContest(data: Partial<ContestType>): Promise<ContestType>;
  patchContest(_id: string, data: Partial<ContestType>): Promise<ContestType>;
  putContest(_id: string, data: Partial<ContestType>): Promise<ContestType>;
  getEveryContest(): Promise<ContestType[]>;
  getContest(_id: string): Promise<ContestType>;
  removeContest(_id: string): Promise<ContestType>;
}
