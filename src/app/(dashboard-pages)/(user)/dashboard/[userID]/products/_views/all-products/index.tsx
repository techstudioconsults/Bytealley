import empty1 from "@/images/empty_img_1.svg";
import empty2 from "@/images/empty_img_2.svg";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { DateRange } from "react-day-picker";

import { AnalyticsCard } from "~/app/(dashboard-pages)/_components/analytics-card";
import { DashboardTable } from "~/app/(dashboard-pages)/_components/dashboard-table";
import { productColumns, RowActions } from "~/app/(dashboard-pages)/_components/dashboard-table/table-data";
import { DateRangePicker } from "~/app/(dashboard-pages)/_components/date-range-picker";
import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import ExportAction from "~/app/(dashboard-pages)/_components/export-action";
import { SelectDropdown } from "~/app/(dashboard-pages)/_components/select-dropdown";
import Loading from "~/app/Loading";
import { LoadingSpinner } from "~/components/miscellaneous/loading-spinner";
import { useDebounce } from "~/hooks/use-debounce";
import { useSession } from "~/hooks/use-session";
import { ProductService } from "~/services/product.service";
import { statusOptions } from "~/utils/constants";

export const AllProducts = ({ productService }: { productService: ProductService }) => {
  const router = useRouter();
  const [isPendingProducts, startTransitionProducts] = useTransition();
  const [isPendingAnalytics, startTransitionAnalytics] = useTransition();
  const [analytics, setAnalytics] = useState<IDashboardAnalytics | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [status, setStatus] = useState<string>("all");
  const { user } = useSession();

  const debouncedStatus = useDebounce(status);
  const debouncedDateRange = useDebounce(dateRange);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const parameters: IProductFilters = {
      page: currentPage,
      ...(debouncedDateRange?.from && { start_date: format(debouncedDateRange.from, "yyyy-MM-dd") }),
      ...(debouncedDateRange?.to && { end_date: format(debouncedDateRange.to, "yyyy-MM-dd") }),
      ...(debouncedStatus !== "all" && {
        status: debouncedStatus as "draft" | "deleted" | "published",
      }),
    };

    startTransitionProducts(async () => {
      const productsData = await productService.getAllProducts(parameters);
      setProducts(productsData?.data || []);
      setPaginationMeta(productsData?.meta || null);
    });
  }, [currentPage, debouncedDateRange, debouncedStatus, productService]);

  useEffect(() => {
    startTransitionAnalytics(async () => {
      const analyticsData = await productService.getDashboardAnalytics();
      setAnalytics(analyticsData?.data ?? null);
    });
  }, [productService]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className={`space-y-10`}>
      <section className={`grid gap-8 lg:grid-cols-4`}>
        <AnalyticsCard
          title={"Total Products"}
          value={isPendingAnalytics ? <LoadingSpinner /> : analytics?.total_products?.toLocaleString()}
        />
        <AnalyticsCard
          title={"Total Sales"}
          value={isPendingAnalytics ? <LoadingSpinner /> : analytics?.total_sales?.toLocaleString()}
        />
        <AnalyticsCard
          title={"Customers"}
          value={isPendingAnalytics ? <LoadingSpinner /> : analytics?.total_customers?.toLocaleString()}
        />
        <AnalyticsCard
          title={"Total Revenue"}
          value={isPendingAnalytics ? <LoadingSpinner /> : `₦${analytics?.total_revenues?.toLocaleString()}`}
        />
      </section>
      <section className={`space-y-4`}>
        {isPendingProducts ? (
          <Loading text={`Loading product table...`} className={`w-fill h-fit p-20`} />
        ) : (
          <>
            <section className={`flex flex-col justify-between lg:flex-row lg:items-center`}>
              <div className={`flex flex-col gap-4 lg:flex-row lg:items-center`}>
                <DateRangePicker className={`w-full lg:w-auto`} onDateChange={handleDateRangeChange} />
                <SelectDropdown
                  options={statusOptions}
                  value={status}
                  onValueChange={handleStatusChange}
                  placeholder="Filter by status"
                />
              </div>
              <ExportAction
                service={productService}
                currentPage={currentPage}
                dateRange={dateRange}
                status={status}
                onDownloadComplete={() => {
                  // Handle any additional logic after download if needed
                }}
              />
            </section>
            {products.length > 0 ? (
              <section>
                <DashboardTable
                  data={products}
                  columns={productColumns}
                  currentPage={paginationMeta?.current_page}
                  totalPages={paginationMeta?.last_page}
                  itemsPerPage={paginationMeta?.per_page}
                  onPageChange={handlePageChange}
                  rowActions={(product) => RowActions(product, productService)}
                  showPagination
                  onRowClick={(product) => {
                    router.push(`/dashboard/${user?.id}/products/${product.id}`);
                  }}
                />
              </section>
            ) : (
              <EmptyState
                images={[
                  { src: empty1.src, alt: "Empty product", width: 322, height: 220 },
                  { src: empty2.src, alt: "Empty product", width: 322, height: 220 },
                  { src: empty1.src, alt: "Empty product", width: 322, height: 220 },
                ]}
                title="Create your first product."
                description="Unlock your creative potential and take the first step towards success on our platform. Create your first product today and join our vibrant community of digital creators. Your masterpiece is just a click away!"
                button={{ text: "Add New Product", onClick: () => {} }}
              />
            )}
          </>
        )}
      </section>
    </section>
  );
};
