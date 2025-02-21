"use client";

import { useTransition } from "react";

import { WithDependency } from "~/HOC/withDependencies";
import { AppService } from "~/services/app.service";
import { dependencies } from "~/utils/dependencies";
import CustomButton from "../common-button/common-button";
import { ReusableDialog } from "../Dialog";

export const Subscription = ({ triggerStyle, appService }: { triggerStyle?: string; appService: AppService }) => {
  const [isPending, starttransition] = useTransition();
  const handleSubscription = () => {
    starttransition(async () => {
      const response = await appService.subscribeToPlan();
      if (response) {
        window.location.href = response.authorization_url;
      }
    });
  };

  return (
    <ReusableDialog
      trigger={
        triggerStyle ? (
          <p className={triggerStyle}>Subscribe Now</p>
        ) : (
          <CustomButton variant={`primary`} size={`lg`}>
            Subscribe Now
          </CustomButton>
        )
      }
      className={`p-14 lg:min-w-[817px]`}
      headerClassName={`text-2xl text-center`}
    >
      <section className={`rounded-xl bg-low-purple p-10 shadow-2xl`}>
        <div className={`space-y-2 text-center`}>
          <p className={`text-lg font-semibold text-mid-coral`}>Subscription Plan</p>
          <h2>
            NGN 5000<span className={`text-sm text-mid-grey-II`}>/Per Month</span>
          </h2>
        </div>
        <div className={`my-10 space-y-8`}>
          <p>✔ Instantly accept payments</p>
          <p>✔ Access to existing features</p>
          <p>✔ Future releases each year</p>
          <p>✔ When can I withdraw from my wallet</p>
          <p>✔ When can I withdraw from my wallet</p>
          <p>✔ When can I withdraw from my wallet</p>
        </div>
        <CustomButton
          onClick={handleSubscription}
          className={`h-[56px] w-full text-xl`}
          variant={`primary`}
          size={`xl`}
          isDisabled={isPending}
          isLoading={isPending}
        >
          Start Creating
        </CustomButton>
      </section>
    </ReusableDialog>
  );
};

export const SubscriptionModal = WithDependency(Subscription, {
  appService: dependencies.APP_SERVICE,
});
