"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

import CustomButton from "~/components/common/common-button/common-button";
import { FormField } from "~/components/common/FormFields";
import { Logo } from "~/components/common/logo";
import { ResetPasswordData, resetPasswordSchema } from "~/schemas";

const ResetPasswordPage = () => {
  const methods = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  // const handleSubmit = async () => {
  //   // TODO: Implement login logic
  // };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-[440px] rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <h1 className="mb-2 text-[32px] font-semibold">Reset password</h1>
        <p className="mb-8 text-muted-foreground">Enter your new password to reset your password.</p>

        <FormProvider {...methods}>
          <form className="space-y-4">
            <FormField
              label="New Password"
              name="password"
              type="password"
              placeholder="Enter new password"
              className={`h-12 bg-low-grey-III`}
              required
            />

            <FormField
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              placeholder="Enter new password"
              className={`h-12 w-full bg-low-grey-III`}
              required
            />

            <div className={`pt-[32px]`}>
              <CustomButton size={`xl`} variant={`primary`} type="submit" className="w-full">
                Reset password
              </CustomButton>
            </div>
          </form>
        </FormProvider>

        <div className="mt-4 text-center text-sm">
          <Link href="/auth/login" className="inline-flex items-center text-primary hover:underline">
            <span className="mr-2">←</span>
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
