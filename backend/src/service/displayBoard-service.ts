import UserContest, { UserContestType } from "@src/model/service/user/Contest";

import { ContestRepository } from "@src/core/repository/contest";
import { ContestMongoRepo } from "@src/repository/mongo/contest";

const contestRepository: ContestRepository = new ContestMongoRepo();

let instance: DisplayBoardMongoService | null = null;
export class DisplayBoardMongoService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  async getData(year: string): Promise<UserContestType> {
    try {
      const data = await contestRepository.readWithJoinById(
        year,
        "curParticipant curSectorRecord",
        {
          _id: 0,
          hostId: 0,
        },
        {
          _id: 0,
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
