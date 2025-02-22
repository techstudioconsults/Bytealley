"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

import CustomButton from "~/components/common/common-button/common-button";
import { ReusableDialog } from "~/components/common/Dialog";
import { FormField } from "~/components/common/FormFields";
import { WithDependency } from "~/HOC/withDependencies";
import { EmailIntegrationFormData, emailIntegrationSchema } from "~/schemas";
import { AppService } from "~/services/app.service";
import { dependencies } from "~/utils/dependencies";
import { Toast } from "~/utils/notificationManager";

const BaseIntegrationModal = ({
  trigger,
  type,
  appService,
}: {
  trigger: ReactNode;
  appService: AppService;
  type: string;
}) => {
  const methods = useForm<EmailIntegrationFormData>({
    resolver: zodResolver(emailIntegrationSchema),
    defaultValues: {
      provider: type,
      token: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleSubmitForm = async (data: EmailIntegrationFormData) => {
    const response = await appService.integrateEmail(data);
    if (response) {
      Toast.getInstance().showToast({
        title: `${response.message}`,
        description: "Email integration successfully.",
        variant: "default",
      });
      reset();
    }
  };

  return (
    <ReusableDialog
      trigger={trigger}
      title={"Connect Your Account"}
      description={`Enter your API key to connect your ${type} account.`}
      className={`p-5 lg:min-w-[555px]`}
      headerClassName={`lg:text-3xl text-xl text-start`}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
          <FormField
            name="token"
            type="textarea"
            className={`h-[20rem] bg-low-grey-III`}
            placeholder={`Enter your API key`}
            label={`Api Key`}
            labelDetailedNode={
              <p className={`text-xs text-mid-grey-II`}>You can find your API key in your {type} account settings.</p>
            }
          />
          <section className={`flex items-center gap-4`}>
            <CustomButton
              type="submit"
              variant={`primary`}
              size={`lg`}
              className={`w-full`}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              Add Integration
            </CustomButton>
          </section>
        </form>
      </FormProvider>
    </ReusableDialog>
  );
};

export const IntegrationModal = WithDependency(BaseIntegrationModal, {
  appService: dependencies.APP_SERVICE,
});
