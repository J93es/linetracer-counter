import "pages/login/Index.css";
import { uri } from "config";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

export interface LoginType {
  admin_id: string;
  admin_password: string;
}

export const FormLoginSchema: z.ZodType<LoginType> = z.object({
  admin_id: z.string().min(1, { message: "아이디를 입력하세요" }),
  admin_password: z.string().min(1, { message: "비밀번호를 입력하세요" }),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ resolver: zodResolver(FormLoginSchema) });

  const [message, setMessage] = useState<string>("");

  const onSubmit = (data: LoginType) => {
    const func = async () => {
      try {
        console.log(data);
        const res = await fetch(`${uri}/admin/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: data.admin_id,
            password: data.admin_password,
          }),
        });
        if (res.status !== 200) {
          const responseBody = await res.json();
          setMessage(responseBody.message ?? "Failed to login");
          throw new Error("Failed to login");
        }
        window.location.href = "/admin";
      } catch (error) {
        console.error("1", error);
      }
    };
    func();
  };

  return (
    <div className="login-card">
      <div className="card-header">
        <h1>Login</h1>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="admin_id">ID</label>
            <input
              id="admin_id"
              type="admin_id"
              className="form-control"
              autoComplete="on"
              {...register("admin_id")}
            />
            <small className="form-text text-muted">
              {errors.admin_id?.message ?? ""}
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="admin_password">Password</label>
            <input
              id="admin_password"
              type="admin_password"
              className="form-control"
              autoComplete="on"
              {...register("admin_password")}
            />
            <small className="form-text text-muted">
              {errors.admin_password?.message ?? ""}
            </small>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div>{message}</div>
      </div>
    </div>
  );
}
