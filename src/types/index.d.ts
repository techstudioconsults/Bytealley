;
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

  type RootState = ReturnType<typeof import("@/store").store.getState>;
  type AppDispatch = typeof import("@/store").store.dispatch;

  type DependencyInjector = (Component: React.ElementType, dependencies: { [key: string]: symbol }) => any;

  type ResolveDependencies = {
    [key: string]: object;
  };

  type OnboardingStep = {
    title: string;
    description: string;
    buttonLabel: string;
    icon: string;
    isCompleted: boolean | undefined;
    action: () => void;
  };

  // Define strict types for table data and actions
  type DataItem = Record<string, any>;

  type ActionType = {
    label: string;
    onClick: (item: any) => void;
    icon?: ReactNode;
    show?: (item: any) => boolean;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  };
}

// This export is needed to make the file a module
export {};