"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

import CustomButton from "~/components/common/common-button/common-button";
import { FormField } from "~/components/common/FormFields";
import { Logo } from "~/components/common/logo";
import { LoginFormData, loginSchema } from "~/schemas";

const LoginPage = () => {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    // TODO: Implement login logic
    console.log(data);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-[440px] rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <h1 className="mb-2 text-[32px] font-semibold">Sign in</h1>
        <p className="mb-8 text-muted-foreground">
          Enter your email and password to continue managing your ideas
        </p>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
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
                className={`h-12 w-full bg-low-grey-III`}
                required
              />
              <div className="flex justify-end">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
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
            <span className="bg-white px-2 text-muted-foreground">
              or continue with
            </span>
          </div>
        </div>

        <CustomButton
          isLeftIconVisible
          icon={<FcGoogle />}
          type="button"
          variant="outline"
          className="w-full"
          size={`xl`}
          onClick={() => {
            // TODO: Implement Google sign-in
          }}
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
