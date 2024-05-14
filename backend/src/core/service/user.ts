import { UserContestType } from "@model/service/user/Contest";

export interface UserService {
  getData(year: string): Promise<UserContestType>;
}
