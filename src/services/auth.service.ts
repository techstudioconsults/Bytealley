import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { HttpAdapter } from "~/adapters/http-adapter";
import { deleteSession, encrypt, setCookie } from "~/lib/session/session";
import { Toast } from "~/utils/notificationManager";

export class AuthService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async register() {}

  async login(data: object, router: AppRouterInstance) {
    const response = await this.http.post(`/auth/login`, data);
    if (response?.status === 200) {
      const user = {
        name: response.user.name,
        userName: response.user.username,
        email: response.user.email,
        role: response.user.role,
        token: response.token,
      };
      const expires = new Date(Date.now() + 60 * 60 * 1000);
      const session = await encrypt({ user, expires });

      await setCookie(session, { expires, httpOnly: true });
      Toast.getInstance().showToast({
        title: `Success`,
        description: `Welcome Back ${response.user.name}!`,
        variant: `success`,
      });
      router.push("/admin/home");
    }
  }

  async logout(router: AppRouterInstance) {
    await deleteSession(); // Remove session cookie

    Toast.getInstance().showToast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
      variant: "warning",
    });

    router.push("/admin/login"); // Redirect to login
  }
}
