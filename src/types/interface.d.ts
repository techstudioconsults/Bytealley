import { JWTPayload } from "jose";

declare global {
  interface ISessionContextType {
    session: Session | null;
    loading: boolean;
    refreshSession: () => Promise<void>;
  }

  interface IAuthState {
    isAuthenticated: boolean;
    user: null | {
      id: string;
      email: string;
      name: string;
    };
  }

  interface IDependencyContainer {
    _dependencies: {
      [key: symbol]: object;
    };
    add: (key: symbol, dependency: object) => void;
    get: <T>(key: symbol) => T;
  }

  interface ISessionData extends JWTPayload {
    user: {
      id: string;
      email: string;
      name?: string;
    };
    expires: string;
  }

  interface ICookieMetadata {
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
    path?: string;
  }

  interface IUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  }

  interface ISession {
    user: IUser;
    accessToken: string;
    refreshToken?: string;
  }

  interface IAuthResponse {
    user: IUser;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  }

  interface ILayoutProperties {
    children: React.ReactNode;
  }

  interface ILoginResponse {
    status: number;
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      role: string;
    };
    token: string;
  }
}

export {};
