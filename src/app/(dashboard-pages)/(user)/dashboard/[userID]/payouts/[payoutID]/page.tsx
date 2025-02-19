"use client";

import { useEffect, useState, useTransition } from "react";

import { BackNavigator } from "~/app/(dashboard-pages)/_components/back-navigator";
import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import { TableHeaderInfo } from "~/app/(dashboard-pages)/_components/table-header-info";
import Loading from "~/app/Loading";
import { WithDependency } from "~/HOC/withDependencies";
import { PayoutService } from "~/services/payout.service";
import { dependencies } from "~/utils/dependencies";

const BasePayoutDetailPage = ({
  params,
  payoutService,
}: {
  params: { payoutID: string };
  payoutService: PayoutService;
}) => {
  const [isPending, startTransition] = useTransition();
  const [payout, setPayout] = useState<IPayout | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      startTransition(async () => {
        const payout = await payoutService.getPayoutById(params.payoutID);
        setPayout(payout || null);
      });
    };

    fetchProductData();
  }, [params.payoutID, payoutService]);

  if (isPending) {
    return <Loading text={`Loading order details...`} className={`w-fill h-fit p-20`} />;
  }

  if (!payout) {
    return (
      <EmptyState
        title="Payout details Not Found"
        description="The payout details you are looking for does not exist."
        images={[]}
        className="h-full"
      />
    );
  }

  return (
    <section className="space-y-6">
      <section className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0 lg:items-center">
        <BackNavigator text="Withdrawal Details" />
      </section>

      <section>
        <p className="mb-4 text-lg font-semibold">{}</p>
        <TableHeaderInfo headers={["Withdrawal Amount", "Status"]} product={payout} />
        <TableHeaderInfo headers={["Account Name", "Bank Account", "Bank Name"]} product={payout} />
        <TableHeaderInfo headers={["Time", "Paid On", "Reference"]} product={payout} />
      </section>
    </section>
  );
};

// Wrap the component with dependencies
const PayoutDetailsPage = WithDependency(BasePayoutDetailPage, {
  payoutService: dependencies.PAYOUT_SERVICE,
});

export default PayoutDetailsPage;
