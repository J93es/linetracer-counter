import { uri } from "config";
import { LoginType } from "pages/login/model/loginSchema";

let instance: AuthController | null = null;
export class AuthController {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const response = await fetch(`${uri}/auth/check-auth`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 200) {
        return true;
      }

      return false;
    } catch (error) {
      console.error("Failed to check auth", error);
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${uri}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Failed to logout", error);
    }
  }

  async login(data: LoginType): Promise<{ message: string; code: number }> {
    try {
      const response = await fetch(`${uri}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.admin_id,
          password: data.password,
        }),
      });

      const responseBody = await response.json();

      if (response.status !== 200) {
        return {
          message: responseBody.message ?? "Failed to login",
          code: response.status,
        };
      }

      return { message: "SUCCESS", code: 200 };
    } catch (error) {
      console.error("Failed to login", error);
      return { message: "Failed to login", code: 500 };
    }
  }
}
