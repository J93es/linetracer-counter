import { UserService } from "@core/service/user";

import UserContestInfo, {
  UserContestInfoType,
} from "@model/adaptor/UserContestInfo";

import { contestRepository } from "@repository/index";

let instance: UserServ | null = null;
export class UserServ implements UserService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  async getData(): Promise<UserContestInfoType> {
    const contest = await contestRepository.readWithJoinByQueryId(
      "current-contest",
      "participantList",
      {},
      {}
    );

    return new UserContestInfo(contest);
  }
}
