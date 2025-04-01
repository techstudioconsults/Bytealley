import { HttpAdapter } from "~/adapters/http-adapter";
import { createSession, deleteSession } from "~/lib/session/session";
import { ForgotPasswordData, LoginFormData, RegisterFormData, ResetPasswordData } from "~/schemas";
import { Toast } from "~/utils/notificationManager";

export class AuthService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async register(data: RegisterFormData): Promise<boolean> {
    const response = await this.http.post(`/auth/register`, data);
    return response?.status === 201;
  }

  async login(data: LoginFormData) {
    const response = await this.http.post<ILoginResponse>(`/auth/login`, data);
    if (response?.status === 200) {
      const user: IUser = this.mapUserResponse(response.data);
      await this.createUserSession(user);
      return user;
    }
  }

  async logout(): Promise<void> {
    await deleteSession();
  }

  async googleSignIn() {
    const response = await this.http.get<{ redirect_url: string }>("/auth/oauth/redirect?provider=google");
    if (response?.status === 200) {
      return response.data.redirect_url;
    }
  }

  async handleGoogleCallback(credentials: { code: string; provider: string }) {
    // console.log(credentials);

    const response = await this.http.get<ILoginResponse>("/auth/oauth/callback", credentials);
    if (response?.status === 200) {
      const user = this.mapUserResponse(response.data);
      await this.createUserSession(user);
      return user;
    }
  }

  async verifyEmail() {
    const response = await this.http.get<IEmailVerificationResponse>(`/auth/email/resend`);
    if (response?.status === 200) {
      Toast.getInstance().showToast({
        title: "Verification Email",
        description: response.data.message,
        variant: "success",
      });
    }
  }

  async forgotPassword(credentials: ForgotPasswordData) {
    const response = await this.http.post<{ message: string }>("/auth/forgot-password", credentials);
    if (response?.status === 200) {
      return response.data;
    }
  }

  async resetPassword(credentials: ResetPasswordData) {
    const response = await this.http.post<{ message: string }>("/auth/reset-password", credentials);
    if (response?.status === 200) {
      return response.data;
    }
  }

  mapUserResponse(data: ILoginResponse): IUser {
    return {
      ...data.user,
      token: data.token,
    };
  }

  async createUserSession(user: IUser): Promise<void> {
    await createSession({
      user,
      expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    });
  }
}
