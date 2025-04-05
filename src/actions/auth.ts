/* eslint-disable no-console */
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ForgotPasswordData, LoginFormData, RegisterFormData, ResetPasswordData } from "~/schemas";
import { AppService } from "~/services/app.service";
import { HttpAdapter } from "../adapters/http-adapter";
import { AuthService } from "../services/auth.service";

// Initialize dependencies
const httpAdapter = new HttpAdapter();
const authService = new AuthService(httpAdapter);

type ActionResult = {
  success?: boolean;
  message?: string;
  error?: string;
};

export async function loginAction(data: LoginFormData): Promise<ActionResult> {
  const user = await authService.login(data);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  await authService.createUserSession(user);
  redirect(`/dashboard/${user.id}/home`);
}

export async function logoutAction() {
  await authService.logout();
}

export async function registerAction(data: RegisterFormData) {
  const success = await authService.register(data);
  if (success) {
    redirect("/auth/login");
  }
}

export async function googleSignInAction() {
  const redirectUrl = await authService.googleSignIn();
  if (redirectUrl) {
    redirect(redirectUrl);
  }
}

export async function handleGoogleCallbackAction(credentials: { code: string; provider: string }) {
  const user = await authService.handleGoogleCallback(credentials);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  await authService.createUserSession(user);
  redirect(`/dashboard/${user.id}/home`);
}

export async function forgotPasswordAction(data: ForgotPasswordData) {
  const response = await authService.forgotPassword(data);
  if (response) {
    return response;
  }
  throw new Error("Failed to send password reset email");
}

export async function resetPasswordAction(data: ResetPasswordData) {
  const response = await authService.resetPassword(data);
  if (response) {
    redirect(`/auth/login`);
    return response;
  }
  throw new Error("Failed to send password reset email");
}

export async function getUser(): Promise<IUser> {
  const user = await authService.getUser();
  console.log(user);
  if (!user) {
    redirect("/auth/login");
  }
  return user;
}

// export async function deleteSession() {
//   cookies().delete("bytealley");
// }
