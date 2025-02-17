import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { SwitchField } from "~/components/common/FormFields";
import { EmailNotificationSettingFormData, emailNotificationSettingSchema } from "~/schemas";
import { SettingsService } from "~/services/settings.service";

export const EmailNotificationSettingsForm = ({ service }: { service: SettingsService }) => {
  const methods = useForm<EmailNotificationSettingFormData>({
    resolver: zodResolver(emailNotificationSettingSchema),
    defaultValues: {
      purchase: false,
      news_updates: false,
      product_creation: false,
      payout: false,
    },
  });

  const handleSwitchChange = async (checked: boolean) => {
    // Perform your API call or action here
    console.log("Switch toggled:", checked);
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-6">
        <SwitchField
          name={"purchase"}
          label={
            <div className={`space-y-2`}>
              <p className={`font-semibold text-high-purple`}>Purchase</p>
              <p className={`text-xs text-mid-grey-II`}>Lorem ipsum dolor sit amet.</p>
            </div>
          }
          className={`flex items-center justify-between`}
          onChange={handleSwitchChange} // Pass the onChange callback
        />
        <hr />
        <SwitchField
          name={"news_updates"}
          label={
            <div className={`space-y-2`}>
              <p className={`font-semibold text-high-purple`}>News & Updates</p>
              <p className={`text-xs text-mid-grey-II`}>Lorem ipsum dolor sit amet.</p>
            </div>
          }
          className={`flex items-center justify-between`}
          onChange={handleSwitchChange} // Pass the onChange callback
        />
        <hr />
        <SwitchField
          name={"product_creation"}
          label={
            <div className={`space-y-2`}>
              <p className={`font-semibold text-high-purple`}>Product Creation</p>
              <p className={`text-xs text-mid-grey-II`}>Lorem ipsum dolor sit amet.</p>
            </div>
          }
          className={`flex items-center justify-between`}
          onChange={handleSwitchChange} // Pass the onChange callback
        />
        <hr />
        <SwitchField
          name={"payout"}
          label={
            <div className={`space-y-2`}>
              <p className={`font-semibold text-high-purple`}>Payout</p>
              <p className={`text-xs text-mid-grey-II`}>Lorem ipsum dolor sit amet.</p>
            </div>
          }
          className={`flex items-center justify-between`}
          onChange={handleSwitchChange} // Pass the onChange callback
        />
        <hr />
      </form>
    </FormProvider>
  );
};
