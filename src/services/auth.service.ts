import { HttpAdapter } from "~/adapters/http-adapter";
import { createSession, deleteSession } from "~/lib/session/session";
import { LoginFormData, RegisterFormData } from "~/schemas";

export class AuthService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async register(data: RegisterFormData): Promise<boolean> {
    const response = await this.http.post(`/auth/register`, data);
    return response?.status === 201;
  }

  async login(data: LoginFormData): Promise<IUser | null> {
    const response = await this.http.post<ILoginResponse>(`/auth/login`, data);

    if (response?.status === 200) {
      const user = this.mapUserResponse(response.data);
      await this.createUserSession(user);
      return user;
    }
    return null;
  }

  async logout(): Promise<void> {
    await deleteSession();
  }

  async googleSignIn(): Promise<string | null> {
    const response = await this.http.get<{ redirect_url: string }>("/auth/oauth/redirect?provider=google");

    return response?.status === 200 ? response.data.redirect_url : null;
  }

  async handleGoogleCallback(credentials: { code: string; provider: string }): Promise<IUser | null> {
    const response = await this.http.post<ILoginResponse>("/auth/oauth/callback", credentials);

    if (response?.status === 200) {
      const user = this.mapUserResponse(response.data);
      await this.createUserSession(user);
      return user;
    }
    return null;
  }

  private mapUserResponse(data: ILoginResponse): IUser {
    return {
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
      role: data.user.role,
      token: data.token,
    };
  }

  private async createUserSession(user: IUser): Promise<void> {
    await createSession({
      user,
      expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    });
  }
}
