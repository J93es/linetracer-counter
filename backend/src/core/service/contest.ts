import { ContestType } from "../../model/index/Contest";

export interface ContestServiceInterface {
  postContest(data: Partial<ContestType>): Promise<ContestType>;
  patchContest(year: string, data: Partial<ContestType>): Promise<ContestType>;
  putContest(year: string, data: Partial<ContestType>): Promise<ContestType>;
  getContestList(): Promise<ContestType[]>;
  getContest(year: string): Promise<ContestType>;
  removeContest(year: string): Promise<ContestType>;
}
