import UserContest, { UserContestType } from "@model/service/user/Contest";

import { contestRepository } from "@repository/index";

let instance: DisplayBoardMongoService | null = null;
export class DisplayBoardMongoService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  async getData(year: string): Promise<UserContestType> {
    try {
      const data = await contestRepository.readWithJoinByQuery(
        year,
        "curParticipant curSectorRecord",
        {
          id: 0,
          hostId: 0,
        },
        {
          id: 0,
          hostId: 0,
        }
      );
      const contest = new UserContest(data);

      return contest;
    } catch (e) {
      throw e;
    }
  }
}
