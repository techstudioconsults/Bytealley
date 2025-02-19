import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { SubscriptionModal } from "~/components/common/subscription-modal";
import { WithDependency } from "~/HOC/withDependencies";
import { SettingsService } from "~/services/settings.service";
import { dependencies } from "~/utils/dependencies";

const BasePlans = ({ settingsService, userID }: { settingsService: SettingsService; userID: string }) => {
  return (
    <section className={`space-y-10`}>
      <section className={`grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-16`}>
        <section className={`col-span-2 space-y-2`}>
          <h4 className={`text-lg lg:text-2xl`}>Plan</h4>
          <p className={`text-sm text-mid-grey-II`}>Select your default payment method</p>
        </section>
        <section className={`col-span-3 space-y-6`}>
          <div className={`flex items-center justify-between`}>
            <p className={`font-semibold`}>Plan Type</p>
            <SubscriptionModal />
          </div>
          <hr />
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
          <hr />
        </section>
      </section>
    </section>
  );
};

export const Plans = WithDependency(BasePlans, {
  settingsService: dependencies.SETTINGS_SERVICE,
});
