"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import CustomButton from "~/components/common/common-button/common-button";
import { FormField } from "~/components/common/FormFields";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ForgotPasswordData, forgotPasswordSchema } from "~/schemas";

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordData) => {
    setIsLoading(true);
    try {
      // TODO: Implement password reset logic
      console.log(values);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-auth-dark flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle className="text-[32px]">Forgot password</CardTitle>
          <p className="text-muted-foreground">Enter your email address to reset your password.</p>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="email"
                type="email"
                label="Email"
                placeholder="sarah.williams@gmail.com"
                required
                disabled={isLoading}
              />
              <CustomButton
                type="submit"
                className="w-full"
                size={`xl`}
                variant={`primary`}
                isDisabled={isLoading}
                isLoading={isLoading}
              >
                Reset password
              </CustomButton>
            </form>
          </FormProvider>

          <div className="mt-4 text-center text-sm">
            <Link href="/auth/login" className="inline-flex items-center text-primary hover:underline">
              <span className="mr-2">←</span>
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
