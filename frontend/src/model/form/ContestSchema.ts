import { z } from "zod";
import { sectorEnum } from "model/enums/index";

export const ContestSchema = z.object({
  id: z.string().min(4, { message: "4글자 이상이어야 합니다." }),
  title: z.string().min(3, { message: "3글자 이상이어야 합니다." }),
  curContestingSection: z.enum(sectorEnum as any, {
    message: "부적절한 경연 부문입니다.",
  }),
});
