import { UserContestType } from "../../service/model/UserContest";

export interface UserService {
  getData(year: string): Promise<UserContestType>;
}
