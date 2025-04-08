import empty from "@/images/info.svg";
import { useEffect, useState, useTransition } from "react";

import { AnalyticsCard } from "~/app/(dashboard-pages)/_components/analytics-card";
import { BackNavigator } from "~/app/(dashboard-pages)/_components/back-navigator";
import { DashboardTable } from "~/app/(dashboard-pages)/_components/dashboard-table";
import { plansColumns } from "~/app/(dashboard-pages)/_components/dashboard-table/table-data";
import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import Loading from "~/app/Loading";
import { SubscriptionModal } from "~/components/common/subscription-modal";
import { LoadingSpinner } from "~/components/miscellaneous/loading-spinner";
import { WithDependency } from "~/HOC/withDependencies";
import { SettingsService } from "~/services/settings.service";
import { dependencies } from "~/utils/dependencies";
import { cn, formatDate } from "~/utils/utils";

const Billing = ({ settingsService }: { settingsService: SettingsService }) => {
  const [isPending, startTransition] = useTransition();
  const [isDeactivationPending, startDeactivationTransition] = useTransition();
  const [billingCycle, setBillingCycle] = useState<IBillingCycle | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      startTransition(async () => {
        const billingData = await settingsService.getSubscriptionBillingCycle();
        setBillingCycle(billingData || null);
      });
    };
    fetchProductData();
  }, [settingsService]);

  const handleSubscriptionDeactivation = async () => {
    startDeactivationTransition(async () => {
      const response = await settingsService.manageSubscriptionPlan(billingCycle?.id || "");
      if (response) {
        window.location.href = response.data.link;
      }
    });
  };

  if (isPending) {
    return <Loading text={`Loading current billing cycle...`} className={`w-fill h-fit p-20`} />;
  }

  return (
    <section className={`space-y-4`}>
      <section className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0 lg:items-center">
        <BackNavigator text="Billing Cycle" />
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <AnalyticsCard
          action={
            <p
              onClick={handleSubscriptionDeactivation}
              className={cn(`cursor-pointer font-semibold text-mid-danger`, !billingCycle?.id && `hidden`)}
            >
              {isDeactivationPending ? <LoadingSpinner /> : `Deactivate Plan`}
            </p>
          }
          title="Renewal Date"
          value={billingCycle ? formatDate(billingCycle.renewal_date) : `N/A`}
        />
        <AnalyticsCard
          action={<SubscriptionModal triggerStyle={`font-semibold text-mid-success cursor-pointer`} />}
          title="Currently"
          value={billingCycle?.plan.replace("_", " ")}
        />
        <AnalyticsCard title="Billing Total" value={`₦${billingCycle?.billing_total?.toLocaleString() || 0}`} />
      </section>
      {(billingCycle?.plans?.length ?? 0 > 0) ? (
        <DashboardTable data={billingCycle?.plans || []} columns={plansColumns} />
      ) : (
        <EmptyState
          images={[{ src: empty.src, alt: "Empty product", width: 100, height: 100 }]}
          title="30 days free trial!"
          description="You have no subscription plan at the moment"
        />
      )}
    </section>
  );
};

const BillingPage = WithDependency(Billing, {
  settingsService: dependencies.SETTINGS_SERVICE,
});

export default BillingPage;
