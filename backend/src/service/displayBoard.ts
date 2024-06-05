import { ContestType } from "@model/Contest";
import { DisplayBoardService } from "@core/service/displayBoard";

import { contestRepository } from "@repository/index";

let instance: DisplayBoardServ | null = null;
export class DisplayBoardServ implements DisplayBoardService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  async getCurrentContest(): Promise<ContestType> {
    try {
      const contest = await contestRepository.readWithJoinByQueryId(
        "current-contest",
        "participantList",
        {},
        {}
      );

      return contest;
    } catch (e) {
      throw e;
    }
  }
}
