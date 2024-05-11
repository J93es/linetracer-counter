import { z } from "zod";

export const ParticipantSchema = z.object({
  name: z.string().min(1, { message: "1글자 이상이어야 합니다." }),
  association: z.string().min(1, { message: "1글자 이상이어야 합니다." }),
  speech: z.string().min(1, { message: "1글자 이상이어야 합니다." }),
});
