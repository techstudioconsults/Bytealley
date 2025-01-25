"use client";

import nairaIcon from "@/icons/naira.svg";
import refreshIcon from "@/icons/Property_2_Update_ojnsf7.svg";
import uploadIcon from "@/icons/Property_2_Upload_cm42yb.svg";
import productImage from "@/images/empty_product.svg";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";

import { AnalyticsCard } from "~/app/(dashboard-pages)/_components/analytics-card/index";
import { DashboardTable } from "~/app/(dashboard-pages)/_components/dashboard-table";
import { DateRangePicker } from "~/app/(dashboard-pages)/_components/date-range-picker";
import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import { SelectDropdown } from "~/app/(dashboard-pages)/_components/select-dropdown";
import CustomButton from "~/components/common/common-button/common-button";
import { LoadingSpinner } from "~/components/miscellaneous/loading-spinner";
import { ProductService } from "~/services/product.service";

export const ActiveUser = ({ productService }: { productService: ProductService }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPendingAnalytics, startTransitionAnalytics] = useTransition();
  const [analytics, setAnalytics] = useState<IDashboardAnalytics | null>(null);
  const [soldProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    startTransitionAnalytics(async () => {
      const analyticsData = await productService.getDashboardAnalytics();
      setAnalytics(analyticsData?.data ?? null);
    });
  }, [productService]);

  return (
    <>
      <section className={`space-y-4`}>
        <section className="flex w-full flex-col gap-4 sm:items-center md:flex-row md:justify-between">
          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
            <DateRangePicker onDateChange={() => {}} />
            <SelectDropdown options={[]} />
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
            value={isPendingAnalytics ? <LoadingSpinner /> : analytics?.total_sales?.toLocaleString()}
            icon={<Image src={nairaIcon} alt="naira" width={40} height={40} />}
            backgroundImage={"/images/analytic_bg_0.svg"}
            className={`col-span-1 sm:col-span-2 lg:col-span-6`}
          />
          <AnalyticsCard
            title="Total Revenue"
            value={isPendingAnalytics ? <LoadingSpinner /> : analytics?.total_revenues?.toLocaleString()}
            valuePrefix={`NGN`}
            icon={<Image src={nairaIcon} alt="naira" width={40} height={40} />}
            backgroundImage={"/images/analytic_bg_1.svg"}
            className={`col-span-1 sm:col-span-2 lg:col-span-6`}
          />
          <AnalyticsCard
            title="New Orders"
            value={isPendingAnalytics ? <LoadingSpinner /> : analytics?.new_orders?.toLocaleString()}
            className={`col-span-1 lg:col-span-4`}
          />
          <AnalyticsCard
            title="New Orders Revenue"
            value={isPendingAnalytics ? <LoadingSpinner /> : analytics?.new_orders_revenue?.toLocaleString()}
            className={`col-span-1 lg:col-span-4`}
          />
          <AnalyticsCard
            title="Total Products"
            value={isPendingAnalytics ? <LoadingSpinner /> : analytics?.total_products?.toLocaleString()}
            className={`col-span-1 lg:col-span-4`}
          />
        </section>
      </section>
      <section className={`mt-10`}>
        {soldProducts.length > 0 ? (
          <>
            <h6 className="mb-4 text-lg font-semibold">Sales</h6>
            <DashboardTable
              data={soldProducts}
              columns={[]}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={2}
              itemsPerPage={10}
              // eslint-disable-next-line no-console
              onRowClick={(row) => console.log("Row clicked:", row)}
            />
          </>
        ) : (
          <EmptyState
            images={[{ src: productImage.src, alt: "Empty product", width: 102, height: 60 }]}
            description="You do not have any sales activities yet."
            button={{ text: "Create your first product", onClick: () => {} }}
            className={"min-h-[236px] rounded-md bg-low-grey-III p-6 text-black"}
          />
        )}
      </section>
    </>
  );
};
