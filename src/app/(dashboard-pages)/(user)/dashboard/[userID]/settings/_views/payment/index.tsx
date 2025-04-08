import { useCallback, useEffect, useState, useTransition } from "react";

import { AddBankModal } from "~/app/(dashboard-pages)/_components/add-bank-modal";
import { BankCard } from "~/app/(dashboard-pages)/_components/bank-card";
import { LoadingSpinner } from "~/components/miscellaneous/loading-spinner";
import { WithDependency } from "~/HOC/withDependencies";
import { EarningService } from "~/services/earnings.service";
import { dependencies } from "~/utils/dependencies";

const BasePayment = ({ earningService }: { earningService: EarningService }) => {
  const [isPending, startTransition] = useTransition();
  const [listOfRegisteredAccounts, setListOfRegisteredAccounts] = useState<IPaymentAccount[]>([]);

  const getAccounts = useCallback(() => {
    startTransition(async () => {
      const registeredAccounts = await earningService.getAllRegisteredPaymentAccount();
      setListOfRegisteredAccounts(registeredAccounts?.data || []);
    });
  }, [earningService]);

  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  return (
    <section className={`space-y-10`}>
      <section className={`grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-16`}>
        <div className={`col-span-2 space-y-2`}>
          <h5 className={`text-h5 font-semibold sm:text-h5-sm`}>Payment Method</h5>
          <p className={`text-sm text-mid-grey-II`}>Select your default payment method</p>
        </div>
        <div className={`col-span-3 space-y-2`}>
          <p className={`font-semibold text-high-purple`}>Gateway</p>
          <section className={`grid grid-cols-1 gap-4 lg:grid-cols-2`}>
            {isPending ? (
              <div
                className={`flex min-h-[120px] max-w-[357px] items-center justify-center rounded-lg bg-low-grey-III`}
              >
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {listOfRegisteredAccounts.map((account) => {
                  return (
                    <BankCard
                      key={account.id}
                      active={account.active}
                      bankName={account.bank_name}
                      accountNumber={account.account_number}
                      accountName={account.name}
                      accountID={account.id}
                    />
                  );
                })}
              </>
            )}

            <AddBankModal getAccounts={getAccounts} service={earningService} />
          </section>
        </div>
      </section>
    </section>
  );
};

export const Payment = WithDependency(BasePayment, {
  earningService: dependencies.EARNINGS_SERVICE,
});
