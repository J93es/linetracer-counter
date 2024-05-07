import { z } from "zod";

import {
  sectorEnum,
  participantRecordSectorStateEnum,
} from "model/enums/index";

export const ParticipantRecordSchema = z.object({
  contestSector: z.enum(sectorEnum as any, {
    message: "부적절한 경연 부문입니다.",
  }),
  order: z.number().min(1, { message: "1 이상이어야 합니다." }),
  remainingContestTime: z.number().min(0, { message: "0 이상이어야 합니다." }),
  sectorState: z.enum(participantRecordSectorStateEnum as any, {
    message: "부적절한 경연 부문입니다.",
  }),
});
