"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState, useTransition } from "react";

import Loading from "~/app/Loading";
import { withDependency } from "~/HOC/withDependencies";
import { getSession } from "~/lib/session/session";
import { LoginFormData, RegisterFormData } from "~/schemas";
import { AuthService } from "~/services/auth.service";
import { dependencies } from "~/utils/dependencies";
import { Toast } from "~/utils/notificationManager";

export const SessionContext = createContext<ISessionContextType | undefined>(undefined);

const BaseSessionProvider = ({ children, authService }: { children: React.ReactNode; authService: AuthService }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initSession = async () => {
      try {
        const session = await getSession();
        if (session?.user) {
          setUser(session.user);
        }
      } finally {
        setIsInitialLoading(false);
      }
    };

    initSession();
  }, []);

  // if (isInitialLoading) {
  //   return <Loading />;
  // }

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

  return (
    <SessionContext.Provider
      value={{
        user,
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
