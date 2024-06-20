import { DisplayBoardContestInfoType } from "@model/adaptor/DisplayBoardContestInfo";

export interface DisplayBoardService {
  getCurrentContestInfo(): Promise<DisplayBoardContestInfoType>;
}
