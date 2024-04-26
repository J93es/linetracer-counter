import { UserContestType } from "../../model/service/UserContest";

export interface UserService {
  getData(year: string): Promise<UserContestType>;
}
