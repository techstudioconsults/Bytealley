import CustomButton from "../common-button/common-button";
import { ReusableDialog } from "../Dialog";

export const SubscriptionModal = ({ triggerStyle }: { triggerStyle?: string }) => {
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
        <CustomButton className={`h-[56px] w-full text-xl`} variant={`primary`} size={`xl`}>
          Start Creating
        </CustomButton>
      </section>
    </ReusableDialog>
  );
};
