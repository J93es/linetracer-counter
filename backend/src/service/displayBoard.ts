import { ContestType } from "@model/Contest";
import DisplayBoardContestInfo, {
  DisplayBoardContestInfoType,
} from "@model/adaptor/DisplayBoardContestInfo";
import { DisplayBoardService } from "@core/service/displayBoard";

import { contestRepository } from "@repository/index";

let instance: DisplayBoardServ | null = null;
export class DisplayBoardServ implements DisplayBoardService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  async getCurrentContestInfo(): Promise<DisplayBoardContestInfoType> {
    try {
      const contest = await contestRepository.readWithJoinByQueryId(
        "current-contest",
        "participantList",
        {},
        {}
      );

      return new DisplayBoardContestInfo(contest);
    } catch (e) {
      throw e;
    }
  }
}
