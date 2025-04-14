import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { SubscriptionModal } from "~/components/common/subscription-modal";
import { Badge } from "~/components/ui/badge";
import { WithDependency } from "~/HOC/withDependencies";
import { useSession } from "~/hooks/use-session";
import { dependencies } from "~/utils/dependencies";
import { cn } from "~/utils/utils";

const BasePlans = ({ userID }: { userID: string }) => {
  const { user } = useSession();
  return (
    <section className={`space-y-10`}>
      <section className={`grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-16`}>
        <section className={`col-span-2 space-y-2`}>
          <h5 className={`text-h5 font-semibold sm:text-h5-sm`}>Plan</h5>
          <p className={`text-sm text-mid-grey-II`}>Select your default payment method</p>
        </section>
        <section className={`col-span-3 space-y-6`}>
          <div className={`flex items-center justify-between`}>
            <div className={`space-y-4`}>
              <p className={`font-semibold`}>Plan Type</p>
              <Badge
                className={cn(
                  `px-4 py-2 text-xs uppercase`,
                  user?.account_type === `free_trial`
                    ? `bg-mid-warning text-high-warning`
                    : `bg-low-success text-mid-success`,
                )}
              >
                {user?.account_type.replace("_", " ")}
              </Badge>
            </div>
            <SubscriptionModal />
          </div>
          <hr className={`border-border`} />
          <div>
            <Link href={`/dashboard/${userID}/settings?tab=billing`}>
              {/* <Link href={`billings`}> */}
              <div className={`flex items-center justify-between`}>
                <div className={`space-y-1`}>
                  <p className={`font-semibold`}>Billing cycle</p>
                  <p className={`text-sm text-mid-grey-II`}>Monthly</p>
                </div>
                <ChevronRight />
              </div>
            </Link>
          </div>
          <hr className={`border-border`} />
        </section>
      </section>
    </section>
  );
};

export const Plans = WithDependency(BasePlans, {
  settingsService: dependencies.SETTINGS_SERVICE,
});
