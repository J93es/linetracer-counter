import { z } from "zod";
import { sectorEnum } from "model/enums/index";
import { ContestType } from "model/Contest";

export interface FormContestType
  extends Omit<
    ContestType,
    | "_id"
    | "curParticipant"
    | "nextParticipant"
    | "curSectorRecord"
    | "contestTimerStartTime"
    | "isContestTimerRunning"
    | "driveStartTime"
    | "isDriveTimerRunning"
    | "latestDriveRecordTime"
    | "participantList"
  > {
  id: string;
  title: string;
  curContestingSection: string;
}

export const FormContestSchema: z.ZodType<FormContestType> = z.object({
  id: z.string().min(4, { message: "4글자 이상이어야 합니다." }),
  title: z.string().min(3, { message: "3글자 이상이어야 합니다." }),
  curContestingSection: z.enum(sectorEnum, {
    message: "부적절한 경연 부문입니다.",
  }),
});
