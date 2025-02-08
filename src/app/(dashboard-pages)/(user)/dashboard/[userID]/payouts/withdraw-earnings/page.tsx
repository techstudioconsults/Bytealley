"use client";

import nairaIcon from "@/icons/naira.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { AddBankModal } from "~/app/(dashboard-pages)/_components/add-bank-modal";
import { AnalyticsCard } from "~/app/(dashboard-pages)/_components/analytics-card";
import { BackNavigator } from "~/app/(dashboard-pages)/_components/back-navigator";
import { BankCard } from "~/app/(dashboard-pages)/_components/bank-card";
import CustomButton from "~/components/common/common-button/common-button";
import { FormField } from "~/components/common/FormFields";
import { LoadingSpinner } from "~/components/miscellaneous/loading-spinner";
import { WithDependency } from "~/HOC/withDependencies";
import { WithdrawalData, withdrawalSchema } from "~/schemas";
import { EarningService } from "~/services/earnings.service";
import { dependencies } from "~/utils/dependencies";

const BaseWithdrawEarnings = ({ earningService }: { earningService: EarningService }) => {
  const [isPending, startTransition] = useTransition();
  const [availableEarnings, setAvailableEarnings] = useState<number>(0);

  const methods = useForm<WithdrawalData>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleSubmitForm = async (data: WithdrawalData) => {
    console.log(data);
  };

  useEffect(() => {
    startTransition(async () => {
      const earningsData = await earningService.getUserEarnings();
      setAvailableEarnings(earningsData?.available_earnings || 0);
    });
  }, [earningService]);

  return (
    <section className={`space-y-12`}>
      <section className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0 lg:items-center">
        <BackNavigator text="Withdrawal Earnings" />
        <CustomButton variant="outline" size="lg" className="w-full border-destructive text-destructive lg:w-auto">
          Cancel
        </CustomButton>
      </section>
      <section>
        <AnalyticsCard
          title="Available Earnings"
          value={isPending ? <LoadingSpinner /> : `₦${availableEarnings.toLocaleString()}`}
          icon={<Image src={nairaIcon} alt="naira" width={40} height={40} />}
          backgroundImage={"/images/analytic_bg_0.svg"}
          className={`shadow-none`}
        />
      </section>
      <section className={`space-y-2`}>
        <h5 className={`text-lg font-semibold`}>Bank Accounts</h5>
        <section className={`grid grid-cols-1 gap-4 lg:grid-cols-3`}>
          <BankCard bankName={"First Bank"} accountNumber={"3091907375"} accountName={"Ifijeh Kingsley Solomon"} />
          <BankCard bankName={"Skye Bank"} accountNumber={"0123456789"} accountName={"Ifijeh Kingsley"} />
          <AddBankModal />
        </section>
      </section>
      <section className={`space-y-2`}>
        <h5 className={`text-lg font-semibold`}>Bank Accounts</h5>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-10">
            <FormField
              label="Amount"
              name="amount"
              type="number"
              placeholder="₦0"
              className={`h-[60px] border-none bg-transparent`}
              containerClassName={`bg-low-grey-III border rounded-md pr-3`}
              required
              rightAddon={<p className={`text-mid-purple`}>Max</p>}
            />
            <CustomButton
              size={`xl`}
              variant={`primary`}
              type="submit"
              className="w-full"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Initialize Withdrawal
            </CustomButton>
          </form>
        </FormProvider>
      </section>
    </section>
  );
};

const WithdrawEarnings = WithDependency(BaseWithdrawEarnings, {
  earningService: dependencies.EARNINGS_SERVICES,
});

export default WithdrawEarnings;
