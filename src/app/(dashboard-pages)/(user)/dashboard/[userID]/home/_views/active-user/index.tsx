import nairaIcon from "@/icons/naira.svg";
import refreshIcon from "@/icons/Property_2_Update_ojnsf7.svg";
import uploadIcon from "@/icons/Property_2_Upload_cm42yb.svg";
import Image from "next/image";
import React from "react";

import { AnalyticsCard } from "~/app/(dashboard-pages)/_components/analytics-card/index";
import { DateRangePicker } from "~/app/(dashboard-pages)/_components/date-range-picker";
import { SelectDropdown } from "~/app/(dashboard-pages)/_components/select-dropdown";
import CustomButton from "~/components/common/common-button/common-button";
import { AuthService } from "~/services/auth.service";

export const ActiveUser = ({ authService, params }: { authService: AuthService; params: { userID: string } }) => {
  return (
    <section className={`space-y-4`}>
      <section className="flex w-full flex-col gap-4 sm:items-center md:flex-row md:justify-between">
        <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
          <DateRangePicker />
          <SelectDropdown />
        </div>
        <div className="flex w-full flex-row gap-2 sm:w-auto sm:justify-start">
          <CustomButton
            className="w-full border-primary text-[16px] text-primary sm:w-auto"
            variant="outline"
            size="xl"
            isLeftIconVisible
            icon={<Image src={uploadIcon} width={16} height={16} alt="export" />}
          >
            Export
          </CustomButton>
          <CustomButton
            className="w-full border-primary text-[16px] text-primary sm:w-auto"
            variant="outline"
            size="xl"
            isLeftIconVisible
            icon={<Image src={refreshIcon} width={16} height={16} alt="export" />}
          >
            Refresh
          </CustomButton>
        </div>
      </section>

      <section className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12`}>
        <AnalyticsCard
          title="Total Sales"
          value={50000}
          valuePrefix={`NGN`}
          icon={<Image src={nairaIcon} alt="naira" width={40} height={40} />}
          backgroundImage={"/images/analytic_bg_0.svg"}
          className={`col-span-1 sm:col-span-2 lg:col-span-6`}
        />
        <AnalyticsCard
          title="Total Revenue"
          value={50000}
          valuePrefix={`NGN`}
          icon={<Image src={nairaIcon} alt="naira" width={40} height={40} />}
          backgroundImage={"/images/analytic_bg_1.svg"}
          className={`col-span-1 sm:col-span-2 lg:col-span-6`}
        />
        <AnalyticsCard
          title="New Orders"
          value={50000}
          className={`col-span-1 lg:col-span-4`}
        />
        <AnalyticsCard
          title="New Orders Revenue"
          value={50000}
          className={`col-span-1 lg:col-span-4`}
        />
        <AnalyticsCard
          title="Total Products"
          value={50000}
          className={`col-span-1 lg:col-span-4`}
        />
      </section>
    </section>
  );
};
