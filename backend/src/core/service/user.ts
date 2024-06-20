import { UserContestInfoType } from "@model/adaptor/UserContestInfo";

export interface UserService {
  getData(): Promise<UserContestInfoType>;
}
