import { ContestType } from "../../model/Contest";

export interface ContestServiceInterface {
  postContest(data: Partial<ContestType>): Promise<ContestType>;
  patchContest(year: string, data: Partial<ContestType>): Promise<ContestType>;
  putContest(year: string, data: Partial<ContestType>): Promise<ContestType>;
  getEveryContest(): Promise<ContestType[]>;
  getContest(year: string): Promise<ContestType>;
  removeContest(year: string): Promise<ContestType>;
}
