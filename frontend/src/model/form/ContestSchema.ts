import { z } from "zod";
import { sectorEnum } from "model/enums/index";
import { ContestType } from "model/Contest";

export interface FormContestType
  extends Omit<
    ContestType,
    | "id"
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
  title: string;
  curContestingSection: string;
}

export const FormContestSchema: z.ZodType<FormContestType> = z.object({
  title: z.string().min(3, { message: "3글자 이상이어야 합니다." }),
  curContestingSection: z.enum(sectorEnum, {
    message: "부적절한 경연 부문입니다.",
  }),
});
