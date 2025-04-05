"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

import { googleSignInAction, loginAction } from "~/actions/auth";
import CustomButton from "~/components/common/common-button/common-button";
import { FormField } from "~/components/common/FormFields";
import { Logo } from "~/components/common/logo";
import { LoginFormData, loginSchema } from "~/schemas";

const LoginPage = () => {
  const [isGooglePending, startGoogleTransition] = useTransition();

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleSubmitForm = async (data: LoginFormData) => {
    await loginAction(data);
  };

  const handleGoogleSignIn = () => {
    startGoogleTransition(async () => {
      await googleSignInAction();
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-[547px] rounded-xl bg-white p-6 shadow-lg lg:p-12">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <h1 className="mb-2 text-[32px] font-semibold">Sign in</h1>
        <p className="mb-8 text-muted-foreground">Enter your email and password to continue managing your ideas</p>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
            {methods.formState.errors.root && (
              <p className="text-sm text-red-500">{methods.formState.errors.root.message}</p>
            )}

            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="name@example.com"
              className={`h-12 bg-low-grey-III`}
              required
            />

            <div className="space-y-2">
              <FormField
                label="Password"
                name="password"
                type="password"
                placeholder="********"
                className={`h-12 w-full bg-low-grey-III`}
                required
              />
              <div className="flex justify-end">
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className={`pt-[32px]`}>
              <CustomButton
                size={`xl`}
                variant={`primary`}
                type="submit"
                className="w-full"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
              >
                Sign in
              </CustomButton>
            </div>
          </form>
        </FormProvider>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-muted-foreground">or continue with</span>
          </div>
        </div>

        <CustomButton
          isLeftIconVisible
          icon={<FcGoogle />}
          type="button"
          variant="outline"
          className="w-full"
          size={`xl`}
          isDisabled={isGooglePending}
          isLoading={isGooglePending}
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </CustomButton>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
