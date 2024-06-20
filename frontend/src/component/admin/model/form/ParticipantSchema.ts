import { z } from "zod";

import { ParticipantType } from "component/admin/model/Participant";

export interface FormDriveRecordType
  extends Omit<
    ParticipantType,
    "id" | "hostId" | "robot" | "sectorRecordList"
  > {
  name: string;
  association: string;
  speech: string;
}

export const FormParticipantSchema: z.ZodType<FormDriveRecordType> = z.object({
  name: z.string().min(1, { message: "1글자 이상이어야 합니다." }),
  association: z.string().min(1, { message: "1글자 이상이어야 합니다." }),
  speech: z.string().min(1, { message: "1글자 이상이어야 합니다." }),
});
