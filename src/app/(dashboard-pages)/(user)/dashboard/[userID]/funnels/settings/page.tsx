"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import CustomButton from "~/components/common/common-button/common-button";
import { FormField, ThumbNailUpload } from "~/components/common/FormFields";
import { FunnelService } from "~/features/funnel";
import { WithDependency } from "~/HOC/withDependencies";
import { useSession } from "~/hooks/use-session";
import { FunnelSettingFormData, funnelSettingsSchema } from "~/schemas";
import { dependencies } from "~/utils/dependencies";

const page = ({ funnelService }: { funnelService: FunnelService }) => {
  const router = useRouter();
  const { user } = useSession();
  const searchParameters = useSearchParams();
  const funnelID = searchParameters.get("funnelID") as string;

  const methods = useForm<FunnelSettingFormData>({
    resolver: zodResolver(funnelSettingsSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      logo: File,
    },
  });

  const handleSubmitForm = async (data: FunnelSettingFormData) => {
    console.log(data);
  };

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const getFunnelIfExist = useCallback(async () => {
    if (funnelID) {
      const funnel = await funnelService.getFunnelByID(funnelID);

      if (funnel) {
        methods.setValue("title", funnel?.data.title);
        methods.setValue("logo", funnel?.data.thumbnail);
      }
    }
  }, []);

  useEffect(() => {
    if (funnelID) {
      getFunnelIfExist();
    }
  }, []);

  return (
    <div>
      <h5 className="mb-4 text-lg font-bold md:text-2xl">{/* Edit {state?.template?.title} Funnel */}</h5>
      <p className="mb-6 text-base text-gray-600">
        {/* Modify the {state?.template?.title} template form below to complete your funnel edit. */}
      </p>
      <section>
        <FormProvider {...methods}>
          <form className={`mx-auto max-w-xl space-y-6`} onSubmit={handleSubmit(handleSubmitForm)}>
            <FormField
              label="Title"
              name="title"
              placeholder="Funnel name"
              className={`h-12 bg-low-grey-III`}
              required
            />
            <ThumbNailUpload
              label={`Thumbnail`}
              labelText={``}
              name="logo"
              acceptedFormats="image/jpeg, image/png"
              maxFileSize={2 * 1024 * 1024}
              initialValue={methods.getValues("logo")}
            />
            <div className={`flex items-center gap-4 pt-6`}>
              <CustomButton
                size={`xl`}
                variant={`outline`}
                className="w-full border-mid-danger text-mid-danger"
                onClick={(event) => {
                  event.preventDefault();
                  reset();
                }}
              >
                Cancel
              </CustomButton>
              <CustomButton type={`submit`} size={`xl`} variant={`primary`} className="w-full">
                Save Edit & Continue
              </CustomButton>
            </div>
          </form>
        </FormProvider>
      </section>
    </div>
  );
};

const FunnelSettingForm = WithDependency(page, {
  funnelService: dependencies.FUNNEL_SERVICE,
});

export default FunnelSettingForm;
