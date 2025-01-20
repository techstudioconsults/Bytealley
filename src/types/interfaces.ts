export interface ISessionContextType {
  session: Session | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
}

export interface IAuthState {
  isAuthenticated: boolean;
  user: null | {
    id: string;
    email: string;
    name: string;
  };
}

export interface IDependencyContainer {
  _dependencies: {
    [key: symbol]: object;
  };
  add: (key: symbol, dependency: object) => void;
  get: <T>(key: symbol) => T;
}

export interface ISessionData extends Record<string, string> {
  userId: string;
  email: string;
  role: string;
  token: string;
}

export interface ICookieMetadata {
  maxAge?: number;
  expires?: Date;
}
