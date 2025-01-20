/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToastProps } from "../components/ui/toast";

declare global {
  type UserRole = "admin" | "user" | "guest";
  type AuthStatus = "authenticated" | "unauthenticated" | "loading";
  type Theme = "light" | "dark";

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

  type DependencyInjector = <T extends React.ComponentType<any>>(
    Component: T,
    dependencies: { [key: string]: symbol },
  ) => (props: React.ComponentProps<T>) => React.ReactElement;

  type ResolveDependencies = {
    [key: string]: unknown;
  };
}

// This export is needed to make the file a module
export {};
