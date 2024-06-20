import { z } from "zod";

import { SectorRecordType } from "pages/admin/model/SectorRecord";
import {
  sectorEnum,
  sectorRecord_sectorStateEnum,
} from "pages/admin/model/enums/index";

export interface FormDriveRecordType
  extends Omit<SectorRecordType, "id" | "hostId" | "driveRecordList"> {
  contestSector: string;
  order: number;
  remainingContestTime: number;
  sectorState: string;
}

export const FormSectorRecordSchema: z.ZodType<FormDriveRecordType> = z.object({
  contestSector: z.enum(sectorEnum, {
    message: "부적절한 경연 부문입니다.",
  }),
  order: z.number().min(1, { message: "1 이상이어야 합니다." }),
  remainingContestTime: z.number().min(0, { message: "0 이상이어야 합니다." }),
  sectorState: z.enum(sectorRecord_sectorStateEnum, {
    message: "부적절한 경연 부문입니다.",
  }),
});
