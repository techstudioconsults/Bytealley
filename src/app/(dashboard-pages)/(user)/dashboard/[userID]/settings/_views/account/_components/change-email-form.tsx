"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { FormField } from "~/components/common/FormFields";
import { Checkbox } from "~/components/ui/checkbox";
import { ChangePasswordFormData, changePasswordSchema } from "~/schemas";
import { SettingsService } from "~/services/settings.service";
import { cn } from "~/utils/utils";

export const ChangeEmailForm = ({ service }: { service: SettingsService }) => {
  const methods = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleSubmitForm = async (data: ChangePasswordFormData) => {
    console.log(data);
  };

  return (
    <>
      <div className={`max-w-[500px]`}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
            <FormField
              label="Account Email"
              name="account_email"
              type="email"
              placeholder="Current email"
              className={`h-12 bg-low-grey-III`}
              containerClassName={`space-x-8`}
              rightAddon={
                <Checkbox
                  checked={false}
                  className={cn(
                    "h-6 w-6 rounded-full border-2",
                    // isCompleted ? "border-black bg-primary" : "border-primary",
                  )}
                />
              }
              required
            />

            <FormField
              label="Alternative Email"
              name="alternative_email"
              type="email"
              placeholder="Enter alternative email"
              className={`h-12 bg-low-grey-III`}
              containerClassName={`space-x-8`}
              rightAddon={
                <Checkbox
                  checked={false}
                  className={cn(
                    "h-6 w-6 rounded-full border-2",
                    // isCompleted ? "border-black bg-primary" : "border-primary",
                  )}
                />
              }
              required
            />
          </form>
        </FormProvider>
      </div>
    </>
  );
};
