import "pages/login/Index.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginType, FormLoginSchema } from "pages/login/model/loginSchema";

import { AuthController } from "pages/login/controller/authController";
import { useNavigate } from "react-router-dom";

const authController = new AuthController();
export default function Login({
  redirectUrl = "/admin",
  setIsAuthenticated,
}: {
  redirectUrl?: string;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ resolver: zodResolver(FormLoginSchema) });

  const navigate = useNavigate();

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const func = async () => {
      try {
        const isAuthenticated = await authController.isAuthenticated();
        if (isAuthenticated) {
          setIsAuthenticated(true);
          navigate(redirectUrl);
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };
    func();
    // eslint-disable-next-line
  }, []);

  const onSubmit = (data: LoginType) => {
    const func = async () => {
      try {
        const { message, code } = await authController.login(data);

        setMessage(message);

        if (code === 200) {
          setIsAuthenticated(true);
          navigate(redirectUrl);
          // window.location.href = redirectUrl;
          return;
        }
      } catch (error) {
        console.error(error);
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              autoComplete="on"
              {...register("password")}
            />
            <small className="form-text text-muted">
              {errors.password?.message ?? ""}
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
