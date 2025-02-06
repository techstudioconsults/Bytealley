"use client";

import refreshIcon from "@/icons/Property_2_Update_ojnsf7.svg";
import uploadIcon from "@/icons/Property_2_Upload_cm42yb.svg";
import emptyCart from "@/images/empty-cart.svg";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { DateRange } from "react-day-picker";

import { DashboardTable } from "~/app/(dashboard-pages)/_components/dashboard-table";
import { customerColumns } from "~/app/(dashboard-pages)/_components/dashboard-table/table-data";
import { DateRangePicker } from "~/app/(dashboard-pages)/_components/date-range-picker";
import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import Loading from "~/app/Loading";
import CustomButton from "~/components/common/common-button/common-button";
import { WithDependency } from "~/HOC/withDependencies";
import { useDebounce } from "~/hooks/use-debounce";
import { useSession } from "~/hooks/use-session";
import { CustomerService } from "~/services/customer.service";
import { dependencies } from "~/utils/dependencies";

const BaseCustomerPage = ({ customerService }: { customerService: CustomerService }) => {
  const [isPendingCustomers, startTransitionCustomers] = useTransition();
  const [customers, setCustomers] = useState<ICustomer[]>([]);
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

  // useEffect(() => {
  //   // const parameters = {
  //   //   page: currentPage,
  //   //   ...(debouncedDateRange?.from && { start_date: format(debouncedDateRange.from, "yyyy-MM-dd") }),
  //   //   ...(debouncedDateRange?.to && { end_date: format(debouncedDateRange.to, "yyyy-MM-dd") }),
  //   // };

  //   startTransitionCustomers(async () => {
  //     setCustomers(customersData.data);
  //     setPaginationMeta(customersData.meta);
  //   });
  // }, [debouncedDateRange, customerService, currentPage]);

  useEffect(() => {
    const parameters = {
      page: currentPage,
      ...(debouncedDateRange?.from && { start_date: format(debouncedDateRange.from, "yyyy-MM-dd") }),
      ...(debouncedDateRange?.to && { end_date: format(debouncedDateRange.to, "yyyy-MM-dd") }),
    };

    startTransitionCustomers(async () => {
      const customersData = await customerService.getAllCustomers(parameters);
      setCustomers(customersData?.data || []);
      setPaginationMeta(customersData?.meta || null);
    });
  }, [debouncedDateRange, customerService, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className={`space-y-10`}>
      <p className={`text-2xl font-medium`}>{customers?.length} Customers</p>
      <section className="flex w-full flex-col gap-4 sm:items-center md:flex-row md:justify-between">
        <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
          <DateRangePicker onDateChange={handleDateRangeChange} />
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
      <section>
        {isPendingCustomers ? (
          <Loading text={`Loading customer table...`} className={`w-fill h-fit p-20`} />
        ) : (
          <>
            {customers.length > 0 ? (
              <DashboardTable
                data={customers}
                columns={customerColumns}
                showPagination
                onPageChange={handlePageChange}
                currentPage={paginationMeta?.current_page}
                totalPages={paginationMeta?.last_page}
                itemsPerPage={paginationMeta?.per_page}
                onRowClick={(customer) => {
                  router.push(`/dashboard/${user?.id}/customers/${customer.id}`);
                }}
              />
            ) : (
              <EmptyState
                images={[emptyCart]}
                title="No Customers found."
                description="You do not have any active customers yet."
                button={{ text: "Create Your First Product", onClick: () => {} }}
              />
            )}
          </>
        )}
      </section>
    </section>
  );
};

const CustomerPage = WithDependency(BaseCustomerPage, {
  customerService: dependencies.CUSTOMER_SERVICE,
});

export default CustomerPage;
