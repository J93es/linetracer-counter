import { z } from "zod";

export const putRobotSchema = z.object({
  name: z.string().min(1, { message: "1글자 이상이어야 합니다." }),
  cpu: z.string(),
  rom: z.string(),
  ram: z.string(),
  motorDriver: z.string(),
  motor: z.string(),
  adc: z.string(),
  sensor: z.string(),
});
