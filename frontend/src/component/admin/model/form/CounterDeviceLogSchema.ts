import { z } from "zod";

import { CounterDeviceLogType } from "component/admin/model/CounterDeviceLog";
import { driveRecord_typeEnum } from "component/admin/model/enums/index";

export interface FormCounterDeviceLogType
  extends Omit<
    CounterDeviceLogType,
    "id" | "hostId" | "startTime" | "endTime" | "writeTime"
  > {
  type: string;
  recordTime: number;
}

export const FormCounterDeviceLogSchema: z.ZodType<FormCounterDeviceLogType> =
  z.object({
    type: z.enum(driveRecord_typeEnum, {
      message: "부적절한 경연 부문입니다.",
    }),
    recordTime: z.number().min(0, { message: "0 이상이어야 합니다." }),
  });
