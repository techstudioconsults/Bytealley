/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

import { WithDependency } from "~/HOC/withDependencies";
import { LoginFormData, ProfileFormData, RegisterFormData } from "~/schemas";
import { AppService } from "~/services/app.service";
import { AuthService } from "~/services/auth.service";
import { dependencies } from "~/utils/dependencies";
import { Toast } from "~/utils/notificationManager";

export const SessionContext = createContext<ISessionContextType | undefined>(undefined);

const BaseSessionProvider = ({
  children,
  authService,
  appService,
  session,
}: {
  children: React.ReactNode;
  authService: AuthService;
  appService: AppService;
  session: any;
}) => {
  const [user, setUser] = useState<IUser | null>(session?.user || null);

  const router = useRouter();

  const handleAuthAction = async <T,>(action: () => Promise<T>): Promise<T | undefined> => {
    try {
      return await action();
    } finally {
      // Transition will automatically complete when the action is done
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

  const updateUserInfo = async (data: ProfileFormData) => {
    const userData = await handleAuthAction(() => appService.updateUser(data));
    if (userData) {
      setUser(userData);
      Toast.getInstance().showToast({
        title: "Profle updated successfully",
        description: "Your profile information has been updated.",
        variant: "default",
      });
    }
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        googleSignIn,
        handleGoogleCallback,
        updateUserInfo,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const SessionProvider = WithDependency(BaseSessionProvider, {
  authService: dependencies.AUTH_SERVICE,
  appService: dependencies.APP_SERVICE,
});

export default SessionProvider;
