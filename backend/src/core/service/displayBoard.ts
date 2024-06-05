import { ContestType } from "@model/Contest";

export interface DisplayBoardService {
  getCurrentContest(): Promise<ContestType>;
}
