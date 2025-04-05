// ~/hooks/use-auth-actions.ts
"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { Toast } from "~/utils/notificationManager";

export function useAuthActions() {
  const router = useRouter();

  const login = useCallback(
    async (data: LoginFormData) => {
      try {
        const result = await loginUser(data);
        if (result.success) {
          Toast.getInstance().showToast({
            title: "Success",
            description: `Welcome back!`,
            variant: "success",
          });
          router.refresh();
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        Toast.getInstance().showToast({
          title: "Login Failed",
          description: error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        });
      }
    },
    [router],
  );

  const register = useCallback(
    async (data: RegisterFormData) => {
      try {
        const result = await registerUser(data);
        if (result.success) {
          Toast.getInstance().showToast({
            title: "Registration Successful",
            description: "Your account has been created. Please login.",
            variant: "success",
          });
          router.push("/auth/login");
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        Toast.getInstance().showToast({
          title: "Registration Failed",
          description: error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        });
      }
    },
    [router],
  );

  const logout = useCallback(async () => {
    try {
      await logoutUser();
      router.refresh();
    } catch (error) {
      Toast.getInstance().showToast({
        title: "Logout Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  }, [router]);

  return { login, register, logout };
}
