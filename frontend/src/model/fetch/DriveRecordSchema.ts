import { z } from "zod";

import { driveRecordTypeEnum } from "model/enums/index";

export const DriveRecordSchema = z.object({
  type: z.enum(driveRecordTypeEnum as any, {
    message: "부적절한 경연 부문입니다.",
  }),
  recordTime: z.number().min(0, { message: "0 이상이어야 합니다." }),
});
