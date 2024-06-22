import { z } from "zod";

export interface LoginType {
  admin_id: string;
  password: string;
}

export const FormLoginSchema: z.ZodType<LoginType> = z.object({
  admin_id: z.string().min(1, { message: "아이디를 입력하세요" }),
  password: z.string().min(1, { message: "비밀번호를 입력하세요" }),
});
