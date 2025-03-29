/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import CustomButton from "~/components/common/common-button/common-button";
import { FormField } from "~/components/common/FormFields";
import { ContactFormData, contactSchema } from "~/schemas";
import { Toast } from "~/utils/notificationManager";

export const ContactUsForm = ({ service }: { service: any }) => {
  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleSubmitForm = async (data: ContactFormData) => {
    const response = await service.contactUs(data);
    if (response) {
      Toast.getInstance().showToast({
        title: "Your message has been sent successfully",
        description: "Byte alley will get back to you soon.",
        variant: "default",
      });
      reset();
    }
  };

  return (
    <section className={`max-w-[444px]`}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="name@example.com"
            className={`h-12 bg-low-grey-III`}
            required
          />
          <FormField
            label="Enquiry Subject"
            name="subject"
            placeholder="Type a subject for your message"
            className={`h-12 bg-low-grey-III`}
            required
          />

          <FormField
            label="Message"
            name="message"
            type="textarea"
            placeholder="Type your message"
            className={`h-[10rem] bg-low-grey-III`}
            required
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
            <CustomButton
              size={`xl`}
              variant={`primary`}
              type="submit"
              className="w-full"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Send Message
            </CustomButton>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};
