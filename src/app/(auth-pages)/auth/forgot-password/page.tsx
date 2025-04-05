"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

import { forgotPasswordAction } from "~/actions/auth";
import CustomButton from "~/components/common/common-button/common-button";
import { FormField } from "~/components/common/FormFields";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ForgotPasswordData, forgotPasswordSchema } from "~/schemas";
import { Toast } from "~/utils/notificationManager";

const ForgotPasswordPage = () => {
  const methods = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleSubmitForm = async (data: ForgotPasswordData) => {
    const result = await forgotPasswordAction(data);
    if (result?.error) {
      Toast.getInstance().showToast({
        title: "Forgot Password Failed",
        description: result.error,
        variant: "error",
      });
    }
    if (result?.success && result.redirectUrl) {
      Toast.getInstance().showToast({
        title: "Email Sent",
        description: result.message ?? "Please check your email for password reset instructions.",
        variant: "success",
      });
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
            <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
              <FormField
                name="email"
                type="email"
                label="Email"
                placeholder="sarah.williams@gmail.com"
                required
                disabled={isSubmitting}
              />
              <CustomButton
                type="submit"
                className="w-full"
                size={`xl`}
                variant={`primary`}
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
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
