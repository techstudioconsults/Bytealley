"use client";

import uploadIcon from "@/icons/Property_2_Upload_cm42yb.svg";
import { format } from "date-fns";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { DateRange } from "react-day-picker";

import { AnalyticsCard } from "~/app/(dashboard-pages)/_components/analytics-card";
import { DashboardTable } from "~/app/(dashboard-pages)/_components/dashboard-table";
import { payoutColumns } from "~/app/(dashboard-pages)/_components/dashboard-table/table-data";
import { DateRangePicker } from "~/app/(dashboard-pages)/_components/date-range-picker";
import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import Loading from "~/app/Loading";
import CustomButton from "~/components/common/common-button/common-button";
import { WithDependency } from "~/HOC/withDependencies";
import { useDebounce } from "~/hooks/use-debounce";
import { useSession } from "~/hooks/use-session";
import { PayoutService } from "~/services/payout.service";
import { dependencies } from "~/utils/dependencies";
import { formatDate } from "~/utils/utils";
import { PayoutBanner } from "./_components/payout-banner";

const BasePayoutsPage = ({ payoutService }: { payoutService: PayoutService }) => {
  const [isPendingPayouts, startTransitionPayouts] = useTransition();
  const [payouts, setPayouts] = useState<IPayout[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { user } = useSession();
  const router = useRouter();
  const debouncedDateRange = useDebounce(dateRange);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setCurrentPage(1);
  };

  useEffect(() => {
    const parameters = {
      page: currentPage,
      ...(debouncedDateRange?.from && { start_date: format(debouncedDateRange.from, "yyyy-MM-dd") }),
      ...(debouncedDateRange?.to && { end_date: format(debouncedDateRange.to, "yyyy-MM-dd") }),
    };

    startTransitionPayouts(async () => {
      const payoutsData = await payoutService.getAllPayouts(parameters);
      setPayouts(payoutsData?.data || []);
      setPaginationMeta(payoutsData?.meta || null);
    });
  }, [debouncedDateRange, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="space-y-10">
      <PayoutBanner />
      {/* views */}
      <section className="space-y-4">
        <section className="flex w-full flex-col gap-4 sm:items-center md:flex-row md:justify-between">
          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
            <DateRangePicker onDateChange={() => {}} />
            <CustomButton
              className="w-full border-primary text-[16px] text-primary sm:w-auto"
              variant="outline"
              size="xl"
              isLeftIconVisible
              icon={<Image src={uploadIcon} width={16} height={16} alt="export" />}
            >
              Export
            </CustomButton>
          </div>
          <div className="flex w-full flex-row gap-2 sm:w-auto sm:justify-start">
            <CustomButton
              className="w-full text-[16px] sm:w-auto"
              variant="primary"
              size="xl"
              isLeftIconVisible
              icon={<PlusCircle />}
            >
              Withdraw Earnings
            </CustomButton>
          </div>
        </section>
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <AnalyticsCard title="Total Earnings" value={`₦${0}`} />
          <AnalyticsCard title="Withdrawals Earnings" value={`₦${0}`} />
          <AnalyticsCard title="Pending" value={`₦${0}`} />
          <AnalyticsCard className="text-mid-success" title="Available Earnings" value={`₦${0}`} />
        </section>
        <section className="space-y-4">
          <h4 className="mt-10 text-[24px] font-semibold">Payout History</h4>
          {isPendingPayouts ? (
            <Loading text={`Loading payout table...`} className={`w-fill h-fit p-20`} />
          ) : (
            <>
              {payouts.length > 0 ? (
                <DashboardTable
                  data={payouts}
                  columns={payoutColumns}
                  showPagination
                  onPageChange={handlePageChange}
                  currentPage={paginationMeta?.current_page}
                  totalPages={paginationMeta?.last_page}
                  itemsPerPage={paginationMeta?.per_page}
                  onRowClick={(payout) => {
                    router.push(`/dashboard/${user?.id}/payouts/${payout.id}`);
                  }}
                />
              ) : (
                <EmptyState
                  images={[
                    {
                      src: "/images/coins.svg",
                      alt: "Payout Tree",
                      width: 125,
                      height: 78,
                    },
                  ]}
                  description="You do not have any sales yet"
                  className={`min-h-[254px] rounded-md bg-low-grey-III p-[32px]`}
                  button={{
                    text: "Create Your First Product",
                    onClick: () => {
                      router.push(`/dashboard/${user?.id}/products/new`);
					},
                  }}
                />
              )}
            </>
          )}
        </section>
      </section>
    </section>
  );
};

const PayoutsPage = WithDependency(BasePayoutsPage, {
  payoutService: dependencies.PAYOUT_SERVICE,
});

export default PayoutsPage;
