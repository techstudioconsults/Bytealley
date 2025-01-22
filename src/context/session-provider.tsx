"use client";

import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

import { withDependency } from "~/HOC/withDependencies";
import { LoginFormData, RegisterFormData } from "~/schemas";
import { AuthService } from "~/services/auth.service";
import { dependencies } from "~/utils/dependencies";
import { Toast } from "~/utils/notificationManager";

export const SessionContext = createContext<ISessionContextType | undefined>(undefined);

const BaseSessionProvider = ({ children, authService }: { children: React.ReactNode; authService: AuthService }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAuthAction = async <T,>(action: () => Promise<T>): Promise<T | undefined> => {
    setIsLoading(true);
    try {
      return await action();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginFormData) => {
    const userData = await handleAuthAction(() => authService.login(data));

    if (userData) {
      setUser(userData);
      Toast.getInstance().showToast({
        title: "Success",
        description: `Welcome, ${userData.name}!`,
        variant: "success",
      });
      router.push(`/dashboard/${userData.id}/home`);
    }
  };

  const register = async (data: RegisterFormData) => {
    const success = await handleAuthAction(() => authService.register(data));

    if (success) {
      Toast.getInstance().showToast({
        title: "Registration Successful",
        description: "Your account has been created successfully. Please login.",
        variant: "success",
      });
      router.push("/auth/login");
    }
  };

  const logout = async () => {
    await handleAuthAction(async () => {
      await authService.logout();
      setUser(null);
      Toast.getInstance().showToast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
        variant: "warning",
      });
      router.push("/auth/login");
    });
  };

  const googleSignIn = async () => {
    const redirectUrl = await handleAuthAction(() => authService.googleSignIn());

    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  const handleGoogleCallback = async (credentials: { code: string; provider: string }) => {
    if (isLoading) return;

    const userData = await handleAuthAction(() => authService.handleGoogleCallback(credentials));

    if (userData) {
      setUser(userData);
      Toast.getInstance().showToast({
        title: "Success",
        description: `Welcome, ${userData.name}!`,
        variant: "success",
      });
      router.push(`/dashboard/${userData.id}/home`);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        googleSignIn,
        handleGoogleCallback,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const SessionProvider = withDependency(BaseSessionProvider, {
  authService: dependencies.AUTH_SERVICE,
});

export default SessionProvider;
