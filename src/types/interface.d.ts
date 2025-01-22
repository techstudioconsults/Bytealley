/* eslint-disable @typescript-eslint/no-explicit-any */
import { JWTPayload } from "jose";

declare global {
  interface ISessionContextType {
    user: IUser | null;
    isLoading: boolean;
    login: (data: LoginFormData, router: AppRouterInstance) => Promise<void>;
    register: (data: RegisterFormData, router: AppRouterInstance) => Promise<void>;
    logout: (router: AppRouterInstance) => Promise<void>;
    googleSignIn: () => Promise<void>;
    handleGoogleCallback: (credentials: { code: string; provider: string }, router: AppRouterInstance) => Promise<void>;
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

  interface IUser {
    avatar: string;
    id: string;
    email: string;
    name: string;
    role: string;
    token: string;
  }

  interface ISessionData extends JWTPayload {
    user: IUser;
    expires: string;
  }

  interface ICookieMetadata {
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
    path?: string;
  }

  interface ILayoutProperties {
    children: React.ReactNode;
  }

  interface ILoginResponse {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
    token: string;
  }

  interface SidebarItem {
    route: string;
    link: string;
    icon?: IconType;
    iconUrl?: string;
    id: string;
    badge?: {
      count?: number;
      variant?: "danger" | "warning" | "success";
    };
    divider?: boolean;
  }

  interface ISidebarProperties {
    sideNavitems?: SidebarItem[];
    logoComponent?: React.ReactNode;
    className?: string;
  }
}

export {};
