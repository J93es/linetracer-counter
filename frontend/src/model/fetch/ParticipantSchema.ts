import { z } from "zod";

export const postParticipantSchema = z.object({
  name: z.string().min(2, { message: "2글자 이상이어야 합니다." }),
  association: z.string().min(1, { message: "1글자 이상이어야 합니다." }),
  speech: z.string().min(1, { message: "1글자 이상이어야 합니다." }),
});

export const putParticipantSchema = z.object({
  speech: z.string().min(1, { message: "1글자 이상이어야 합니다." }),
});
