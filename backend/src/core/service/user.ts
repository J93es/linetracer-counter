import { UserContestType } from "@src/model/service/user/Contest";

export interface UserService {
  getData(year: string): Promise<UserContestType>;
}
