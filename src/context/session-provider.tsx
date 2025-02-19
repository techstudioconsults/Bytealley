/* eslint-disable no-console */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";

import Loading from "~/app/Loading";
// import Loading from "~/app/Loading";
import { WithDependency } from "~/HOC/withDependencies";
import { useLoading } from "~/hooks/use-loading";
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
  const [user, setUser] = useState<IUser | undefined>(session?.user);
  const { setLoading, isLoading } = useLoading();
  const router = useRouter();

  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      if (session?.user) {
        const userData = await appService.getCurrentUser();
        setUser(userData);
      } else {
        setUser(undefined);
      }
    } catch (error) {
      console.error("Failed to fetch current user:", error);
    } finally {
      setLoading(false);
    }
  }, [appService, session?.user, setLoading]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  if (isLoading) {
    return <Loading />;
  }

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
      router.push("/auth/login");
      Toast.getInstance().showToast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
        variant: "warning",
      });
      setUser(undefined);
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
        title: "Profile updated successfully",
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
        fetchCurrentUser,
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
