import { z } from "zod";

import { RobotType } from "model/Robot";

export interface FormDriveRecordType extends Omit<RobotType, "id" | "hostId"> {
  name: string;
  cpu: string;
  rom: string;
  ram: string;
  motorDriver: string;
  motor: string;
  adc: string;
  sensor: string;
}

export const FormRobotSchema: z.ZodType<FormDriveRecordType> = z.object({
  name: z.string().min(1, { message: "1글자 이상이어야 합니다." }),
  cpu: z.string(),
  rom: z.string(),
  ram: z.string(),
  motorDriver: z.string(),
  motor: z.string(),
  adc: z.string(),
  sensor: z.string(),
});
