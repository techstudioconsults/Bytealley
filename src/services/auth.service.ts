import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { HttpAdapter } from "~/adapters/http-adapter";
import { createSession, deleteSession } from "~/lib/session/session";
import { RegisterFormData } from "~/schemas";
import { Toast } from "~/utils/notificationManager";

export class AuthService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async register(data: RegisterFormData, router: AppRouterInstance) {
    const response = await this.http.post(`/auth/register`, data);

    if (response?.status === 201) {
      Toast.getInstance().showToast({
        title: "Registration Successful",
        description:
          "Your account has been created successfully. Please login.",
        variant: "success",
      });
      router.push("/auth/login");
    }
  }

  async login(data: object, router: AppRouterInstance) {
    const response = await this.http.post<ILoginResponse>(`/auth/login`, data);

    if (response?.status === 200) {
      const user = {
        id: response.data.user.id,
        email: response.data.user.email,
        name: response.data.user.name,
        role: response.data.user.role,
        token: response.data.token,
      };

      await createSession({
        user,
        expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      });

      Toast.getInstance().showToast({
        title: `Success`,
        description: `Welcome, ${response.data.user.name}!`,
        variant: `success`,
      });
      router.push(`/dashboard/${response.data.user.id}/home`);
    }
  }

  async logout(router: AppRouterInstance) {
    await deleteSession(); // Remove session cookie

    Toast.getInstance().showToast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
      variant: "warning",
    });

    router.push("/auth/login"); // Redirect to login
  }

  async googleSignIn() {
    const response = await this.http.get<{ redirect_url: string }>(
      "/auth/oauth/redirect?provider=google",
    );

    if (response?.status === 200 && response.data.redirect_url) {
      window.location.href = response.data.redirect_url;
    }
  }

  async handleGoogleCallback(
    credentials: { code: string; provider: string },
    router: AppRouterInstance,
  ) {
    const response = await this.http.post<ILoginResponse>(
      "/auth/oauth/callback",
      credentials,
    );

    if (response?.status === 200) {
      const user = {
        id: response.data.user.id,
        email: response.data.user.email,
        name: response.data.user.name,
        role: response.data.user.role,
        token: response.data.token,
      };

      await createSession({
        user,
        expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      });

      Toast.getInstance().showToast({
        title: `Success`,
        description: `Welcome, ${response.data.user.name}!`,
        variant: `success`,
      });
      router.push(`/dashboard/${response.data.user.id}/home`);
    }
  }
}
