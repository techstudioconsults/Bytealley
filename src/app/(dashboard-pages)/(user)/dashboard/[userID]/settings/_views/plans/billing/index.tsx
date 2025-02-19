import { useEffect, useState, useTransition } from "react";

import { AnalyticsCard } from "~/app/(dashboard-pages)/_components/analytics-card";
import { BackNavigator } from "~/app/(dashboard-pages)/_components/back-navigator";
import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import Loading from "~/app/Loading";
import { SubscriptionModal } from "~/components/common/subscription-modal";
import { WithDependency } from "~/HOC/withDependencies";
import { SettingsService } from "~/services/settings.service";
import { dependencies } from "~/utils/dependencies";
import { formatDate } from "~/utils/utils";

const Billing = ({ settingsService }: { settingsService: SettingsService }) => {
  const [isPending, startTransition] = useTransition();
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

  if (isPending) {
    return <Loading text={`Loading current billing cycle...`} className={`w-fill h-fit p-20`} />;
  }

  if (!billingCycle) {
    return <EmptyState title="Billing cycle Not Found" description="" images={[]} className="h-full" />;
  }

  return (
    <section className={`space-y-4`}>
      <section className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0 lg:items-center">
        <BackNavigator text="Billing Cycle" />
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <AnalyticsCard
          action={<p className={`cursor-pointer font-semibold text-mid-danger`}>Deactivate Plan</p>}
          title="Renewal Date"
          value={formatDate(billingCycle?.renewal_date) || `N/A`}
        />
        <AnalyticsCard
          action={<SubscriptionModal triggerStyle={`font-semibold text-mid-success cursor-pointer`} />}
          title="Currently"
          value={billingCycle?.plan.replace("_", " ")}
        />
        <AnalyticsCard title="Billing Total" value={`₦${billingCycle?.billing_total?.toLocaleString() || 0}`} />
      </section>
    </section>
  );
};

const BillingPage = WithDependency(Billing, {
  settingsService: dependencies.SETTINGS_SERVICE,
});

export default BillingPage;
