"use client";

// import refreshIcon from "@/icons/Property_2_Update_ojnsf7.svg";
import emptyCart from "@/images/empty-cart.svg";
import { format } from "date-fns";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { DateRange } from "react-day-picker";

import { DashboardTable } from "~/app/(dashboard-pages)/_components/dashboard-table";
import { customerColumns } from "~/app/(dashboard-pages)/_components/dashboard-table/table-data";
import { DateRangePicker } from "~/app/(dashboard-pages)/_components/date-range-picker";
import { EmptyState, FilteredEmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import ExportAction from "~/app/(dashboard-pages)/_components/export-action";
import Loading from "~/app/Loading";
import { WithDependency } from "~/HOC/withDependencies";
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
    const parameters: IFilters = {
      page: currentPage,
      ...(dateRange?.from && { start_date: format(dateRange.from, "yyyy-MM-dd") }),
      ...(dateRange?.to && { end_date: format(dateRange.to, "yyyy-MM-dd") }),
    };

    startTransitionCustomers(async () => {
      const customersData = await customerService.getAllCustomers(parameters);
      setCustomers(customersData?.data || []);
      setPaginationMeta(customersData?.meta || null);
    });
  }, [customerService, currentPage, dateRange?.from, dateRange?.to]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className={`space-y-10`}>
      <p className={`text-2xl font-medium`}>{customers?.length} Customers</p>
      <section className="flex w-full flex-col-reverse gap-4 sm:items-center md:flex-row md:justify-between">
        <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
          <DateRangePicker onDateChange={handleDateRangeChange} />
        </div>
        <div className="flex w-full flex-row gap-2 sm:w-auto sm:justify-start">
          <ExportAction
            serviceMethod={(filters) => customerService.downloadCustomersAsCSV(filters)}
            currentPage={1}
            dateRange={dateRange}
            buttonText="Export Customers"
            fileName="customer"
            size={`xl`}
          />
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
                    src: emptyCart,
                    alt: "Empty cart",
                    width: 100,
                    height: 100,
                  },
                ]}
                title="No Customers found."
                description="You do not have any active customers yet."
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
  );
};

const CustomerPage = WithDependency(BaseCustomerPage, {
  customerService: dependencies.CUSTOMER_SERVICE,
});

export default CustomerPage;
