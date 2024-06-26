import { z } from "zod";
import { sectorEnum } from "pages/admin/model/enums/index";
import { ContestType } from "pages/admin/model/Contest";

export interface FormContestType
  extends Omit<
    ContestType,
    | "id"
    | "curParticipant"
    | "nextParticipant"
    | "contestTimerStartTime"
    | "isContestTimerRunning"
    | "remainingContestTime"
    | "driveStartTime"
    | "isDriveStopWatchRunning"
    | "latestDriveRecordTime"
    | "participantList"
  > {
  queryId: string;
  title: string;
  curContestingSection: string;
}

export const FormContestSchema: z.ZodType<FormContestType> = z.object({
  queryId: z.string().min(3, { message: "3글자 이상이어야 합니다." }),
  title: z.string().min(3, { message: "3글자 이상이어야 합니다." }),
  curContestingSection: z.enum(sectorEnum, {
    message: "부적절한 경연 부문입니다.",
  }),
});
