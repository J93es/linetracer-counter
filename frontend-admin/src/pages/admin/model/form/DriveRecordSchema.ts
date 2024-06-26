import { z } from "zod";

import { DriveRecordType } from "pages/admin/model/DriveRecord";
import { driveRecord_typeEnum } from "pages/admin/model/enums/index";

export interface FormDriveRecordType
  extends Omit<DriveRecordType, "id" | "hostId" | "writeTime"> {
  type: string;
  recordTime: number;
}

export const FormDriveRecordSchema: z.ZodType<FormDriveRecordType> = z.object({
  type: z.enum(driveRecord_typeEnum, {
    message: "부적절한 경연 부문입니다.",
  }),
  recordTime: z.number().min(0, { message: "0 이상이어야 합니다." }),
});
