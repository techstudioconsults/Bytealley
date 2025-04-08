"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import CustomButton from "~/components/common/common-button/common-button";
import { FormField, ThumbNailUpload } from "~/components/common/FormFields";
import { FunnelService } from "~/features/funnel";
import { WithDependency } from "~/HOC/withDependencies";
import { useSession } from "~/hooks/use-session";
import { FunnelSettingFormData, funnelSettingsSchema } from "~/schemas";
import { dependencies } from "~/utils/dependencies";
import { Toast } from "~/utils/notificationManager";

const Page = ({ funnelService }: { funnelService: FunnelService }) => {
  const router = useRouter();
  const { user } = useSession();
  const searchParameters = useSearchParams();
  const funnelID = searchParameters.get("funnelID") as string;
  const [funnel, setFunnel] = useState<IFunnel>();

  const methods = useForm<FunnelSettingFormData>({
    resolver: zodResolver(funnelSettingsSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      logo: null,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  // Fetch the funnel data if funnelID exists
  const getFunnelIfExist = useCallback(async () => {
    if (funnelID) {
      const response = await funnelService.getFunnelByID(funnelID);
      if (response) {
        setFunnel(response.data as IFunnel);
        reset({
          title: response.data.title,
          logo: response.data.thumbnail,
        });
      }
    }
  }, [funnelID, funnelService, reset]);

  useEffect(() => {
    if (funnelID) {
      getFunnelIfExist();
    }
  }, [funnelID, getFunnelIfExist]);

  // Handle form submission
  const handleSubmitForm = async (data: FunnelSettingFormData) => {
    const response = await funnelService.updateFunnel({
      id: funnel?.id as string,
      status: funnel?.status as string,
      title: data.title as string,
      thumbnail: data.logo,
      created_at: "",
    });
    if (response) {
      Toast.getInstance().showToast({
        title: `Funnel Status`,
        description: `Funnel ${funnel?.title} has been updated successfully!`,
        variant: "default",
      });
      router.push(`/dashboard/${user?.id}/funnels`);
    }
  };

  return (
    <div>
      <h5 className="mb-4 text-h4 sm:text-h4-sm md:text-h4-md">
        {funnel ? `Edit ${funnel.title} Funnel` : "Create New Funnel"}
      </h5>
      <p className="mb-6 text-base text-gray-600">
        {funnel
          ? `Modify the ${funnel.title} template form below to complete your funnel edit.`
          : "Fill out the form below to create a new funnel."}
      </p>
      <section>
        <FormProvider {...methods}>
          <form className="mx-auto max-w-xl space-y-6" onSubmit={handleSubmit(handleSubmitForm)}>
            <FormField label="Title" name="title" placeholder="Funnel name" className="h-12 bg-low-grey-III" required />
            <ThumbNailUpload
              label="Thumbnail"
              labelText="Upload a square image (max size: 2MB)"
              name="logo"
              acceptedFormats="image/jpeg, image/png"
              maxFileSize={2 * 1024 * 1024}
              initialValue={methods.getValues("logo")}
            />
            <div className="flex items-center gap-4 pt-6">
              <CustomButton
                size="xl"
                variant="outline"
                className="w-full border-mid-danger text-mid-danger"
                onClick={(event) => {
                  event.preventDefault();
                  reset({
                    title: "",
                    logo: null,
                  });
                  router.push(`/dashboard/${user?.id}/funnels`);
                }}
              >
                Cancel
              </CustomButton>
              <CustomButton type="submit" size="xl" variant="primary" className="w-full" isDisabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Edit & Continue"}
              </CustomButton>
            </div>
          </form>
        </FormProvider>
      </section>
    </div>
  );
};

const FunnelSettingForm = WithDependency(Page, {
  funnelService: dependencies.FUNNEL_SERVICE,
});

export default FunnelSettingForm;
