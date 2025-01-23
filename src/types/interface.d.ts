import { JWTPayload } from "jose";

declare global {
  interface ISessionContextType {
    user: IUser | null;
    login: (data: LoginFormData) => Promise<void>;
    register: (data: RegisterFormData) => Promise<void>;
    logout: () => Promise<void>;
    googleSignIn: () => Promise<void>;
    handleGoogleCallback: (credentials: { code: string; provider: string }) => Promise<void>;
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
    id: string;
    name: string;
    username: string | null;
    email: string;
    phone_number: string | null;
    bio: string | null;
    account_type: string;
    logo: string | null;
    role: string;
    status: string | null;
    twitter_account: string | null;
    facebook_account: string | null;
    youtube_account: string | null;
    alt_email: string | null;
    email_verified: boolean;
    profile_completed: boolean;
    first_product_created: boolean;
    payout_setup: boolean;
    first_sale: boolean;
    product_creation_notification: boolean;
    purchase_notification: boolean;
    news_and_update_notification: boolean;
    payout_notification: boolean;
    kyc_complete: boolean;
    created_at: string;
    updated_at: string;
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
    user: IUser;
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

  interface IEmailVerificationResponse {
    message: string;
    success: boolean;
  }

  interface OnboardingStep {
    title: string;
    description: string;
    buttonLabel: string;
    icon: string;
    isCompleted: boolean | undefined;
    action: () => void;
  }
}

export {};
