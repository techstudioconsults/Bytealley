import { HttpAdapter } from "~/adapters/http-adapter";
import { createSession, deleteSession } from "~/lib/session/session";
import { LoginFormData, RegisterFormData } from "~/schemas";
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

  async handleGoogleCallback(credentials: { code: string; provider: string }) {
    const response = await this.http.post<ILoginResponse>("/auth/oauth/callback", credentials);
    if (response?.status === 200) {
      const user = this.mapUserResponse(response.data);
      await this.createUserSession(user);
      return user;
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
