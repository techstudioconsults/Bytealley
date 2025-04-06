"use client";

import payoutImg from "@/images/payout_tree.svg";
import { format } from "date-fns";
import debounce from "lodash.debounce";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { DateRange } from "react-day-picker";

import { AnalyticsCard } from "~/app/(dashboard-pages)/_components/analytics-card";
import { PDBanner } from "~/app/(dashboard-pages)/_components/banner/pd-banner";
import { DashboardTable } from "~/app/(dashboard-pages)/_components/dashboard-table";
import { payoutColumns } from "~/app/(dashboard-pages)/_components/dashboard-table/table-data";
import { DateRangePicker } from "~/app/(dashboard-pages)/_components/date-range-picker";
import { EmptyState, FilteredEmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import ExportAction from "~/app/(dashboard-pages)/_components/export-action";
import Loading from "~/app/Loading";
import CustomButton from "~/components/common/common-button/common-button";
import { LoadingSpinner } from "~/components/miscellaneous/loading-spinner";
import { WithDependency } from "~/HOC/withDependencies";
import { useSession } from "~/hooks/use-session";
import { EarningService } from "~/services/earnings.service";
import { PayoutService } from "~/services/payout.service";
import { dependencies } from "~/utils/dependencies";
import { cn } from "~/utils/utils";

const BasePayoutsPage = ({
  payoutService,
  earningService,
}: {
  payoutService: PayoutService;
  earningService: EarningService;
}) => {
  const [isEarningsPending, startEarningsTransition] = useTransition();
  const [isPayoutPending, startPayoutTransition] = useTransition();
  const [payouts, setPayouts] = useState<IPayout[]>([]);
  const [earnings, setEarnings] = useState<IEarnings>();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { user } = useSession();
  const router = useRouter();

  const debounceDateRangeReference = useRef(
    debounce((value: DateRange) => {
      setDateRange(value);
    }, 300),
  );

  const handleDateRangeChange = useCallback((value: DateRange) => {
    debounceDateRangeReference.current(value);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    startEarningsTransition(async () => {
      const earningsData = await earningService.getUserEarnings();
      setEarnings(earningsData);
    });
  }, [earningService]);

  useEffect(() => {
    const parameters: IFilters = {
      page: currentPage,
      ...(dateRange?.from && { start_date: format(dateRange.from, "yyyy-MM-dd") }),
      ...(dateRange?.to && { end_date: format(dateRange.to, "yyyy-MM-dd") }),
    };

    startPayoutTransition(async () => {
      const payoutsData = await payoutService.getAllPayouts(parameters);
      setPayouts(payoutsData?.data || []);
      setPaginationMeta(payoutsData?.meta || null);
    });
  }, [payoutService, currentPage, dateRange]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="space-y-10">
      <PDBanner
        title={"Grow communities and get paid."}
        description={"Make as much as ₦10,000 sale for your first withdraw"}
        imageSrc={payoutImg}
        imageAlt={"Payout Tree"}
      />
      {/* views */}
      <section className="space-y-4">
        <section className="flex w-full flex-col gap-4 sm:items-center md:flex-row md:justify-between">
          <div className="flex w-full flex-col-reverse gap-2 sm:flex-row md:w-auto">
            <DateRangePicker onDateChange={handleDateRangeChange} />
            <ExportAction
              serviceMethod={(filters) => payoutService.downloadPayoutAsCSV(filters)}
              currentPage={currentPage}
              dateRange={dateRange}
              buttonText="Export Table Info"
              fileName="payout"
              size={`xl`}
            />
          </div>
          <div className="mt-4 flex w-full flex-row justify-end gap-2 sm:w-auto md:mt-0">
            <CustomButton
              className="w-full text-[16px] sm:w-auto"
              variant="primary"
              size="xl"
              isLeftIconVisible
              icon={<PlusCircle />}
              isDisabled={!earnings?.available_earnings}
              href={`/dashboard/${user?.id}/payouts/withdraw-earnings`}
            >
              Withdraw Earnings
            </CustomButton>
          </div>
        </section>
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AnalyticsCard
            title="Total Earnings"
            value={isEarningsPending ? <LoadingSpinner /> : `₦${earnings?.total_earnings?.toLocaleString() || 0}`}
          />
          <AnalyticsCard
            title="Withdrawals Earnings"
            value={isEarningsPending ? <LoadingSpinner /> : `₦${earnings?.withdrawn_earnings?.toLocaleString() || 0}`}
          />
          <AnalyticsCard
            title="Pending"
            value={isEarningsPending ? <LoadingSpinner /> : `₦${earnings?.pending?.toLocaleString() || 0}`}
          />
          <AnalyticsCard
            className={cn(earnings?.available_earnings ? `text-mid-success` : `text-mid-danger`)}
            title="Available Earnings"
            value={isEarningsPending ? <LoadingSpinner /> : `₦${earnings?.available_earnings?.toLocaleString() || 0}`}
          />
        </section>
        <section className="space-y-4">
          <h4 className="mt-10 text-[24px] font-semibold">Payout History</h4>
          {isPayoutPending ? (
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
              ) : dateRange?.from || dateRange?.to ? (
                <FilteredEmptyState
                  onReset={() => {
                    setDateRange(undefined);
                    setCurrentPage(1);
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
  earningService: dependencies.EARNINGS_SERVICE,
});

export default PayoutsPage;
