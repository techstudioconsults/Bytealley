import { ToastProps } from "../components/ui/toast";

declare global {
  type ExtendedToastProps = ToastProps & {
    description: string;
  };

  type LogoProperties = {
    logo: string;
  };

  type Session = {
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string | null;
      role: string;
      token: string;
    };
    expires: string;
    iat: number;
    exp: number;
  };

  type RootState = ReturnType<typeof import("@/store").store.getState>;
  type AppDispatch = typeof import("@/store").store.dispatch;
}

// This export is needed to make the file a module
export {};
