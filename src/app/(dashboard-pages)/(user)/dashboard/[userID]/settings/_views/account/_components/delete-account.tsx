import React from "react";

import CustomButton from "~/components/common/common-button/common-button";
import { AppService } from "~/services/app.service";

export const DeleteAccount = ({ service }: { service: AppService }) => {
  return (
    <section className={`space-y-4`}>
      <div>
        <p className={`font-semibold`}>Disabling Account</p>
        <p className={`text-[10px] text-mid-grey-II`}>
          When your account is disabled, your profile and products won’t be shared until you enable the account.Contact
          support to enable account whenever you’re ready.
        </p>
      </div>
      <div className={`space-x-4`}>
        <CustomButton size={`lg`} variant={`destructive`}>
          Disable Account
        </CustomButton>
        <CustomButton size={`lg`} className={`border-destructive text-destructive`} variant={`outline`}>
          Delete Account
        </CustomButton>
      </div>
    </section>
  );
};
