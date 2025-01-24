import uploadIcon from "@/icons/Property_2_Upload_cm42yb.svg";
import empty1 from "@/images/empty_img_1.svg";
import empty2 from "@/images/empty_img_2.svg";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { DateRange } from "react-day-picker";

import { AnalyticsCard } from "~/app/(dashboard-pages)/_components/analytics-card";
import { DashboardTable } from "~/app/(dashboard-pages)/_components/dashboard-table";
import { DateRangePicker } from "~/app/(dashboard-pages)/_components/date-range-picker";
import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import { SelectDropdown } from "~/app/(dashboard-pages)/_components/select-dropdown";
import Loading from "~/app/Loading";
import CustomButton from "~/components/common/common-button/common-button";
import { LoadingSpinner } from "~/components/miscellaneous/loading-spinner";
import { Badge } from "~/components/ui/badge";
import { useDebounce } from "~/hooks/use-debounce";
import { ProductService } from "~/services/product.service";
import { rowActions, statusOptions } from "~/utils/constants";
import { cn } from "~/utils/utils";

export const AllProducts = ({ productService }: { productService: ProductService }) => {
  const [isPendingProducts, startTransitionProducts] = useTransition();
  const [isPendingAnalytics, startTransitionAnalytics] = useTransition();
  const [analytics, setAnalytics] = useState<IDashboardAnalytics | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [status, setStatus] = useState<string>("all");

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

  const columns: IColumnDefinition<IProduct>[] = [
    {
      header: "Product Name",
      accessorKey: "title",
      render: (_, product: IProduct) => (
        <div className={`flex w-fit items-center gap-2`}>
          <Image
            src={product.thumbnail}
            alt="product"
            width={100}
            height={64}
            className={`h-[64px] w-[100px] rounded-md bg-low-grey-III object-cover`}
          />
          <div className="flex flex-col space-y-2">
            <span className="text-[16px] font-medium">{product.title}</span>
            <span className="space-x-1 text-sm text-mid-grey-II">
              {`PDF-55.MB • `}
              <span>
                {new Date(product.created_at).toLocaleString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span>•</span>
              <span>
                {new Date(product.created_at).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </span>
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Price",
      accessorKey: "price",
      render: (_, product: IProduct) => <span>₦{product.price?.toLocaleString()}</span>,
    },
    {
      header: "Sales",
      accessorKey: "total_sales",
    },
    {
      header: "Type",
      accessorKey: "product_type",
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (_, product: IProduct) => (
        <Badge
          className={cn(
            product.status === "draft" ? "bg-mid-warning text-high-warning" : "bg-mid-success text-high-success",
            "rounded-sm px-4 py-2",
          )}
        >
          {product.status}
        </Badge>
      ),
    },
  ];

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
          value={isPendingAnalytics ? <LoadingSpinner /> : analytics?.total_revenues?.toLocaleString()}
        />
      </section>
      <section className={`space-y-4`}>
        {isPendingProducts ? (
          <Loading text={`Loading product table...`} className={`w-fill h-fit p-20`} />
        ) : (
          <>
            {products.length > 0 ? (
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
                  <CustomButton
                    variant={`outline`}
                    className={`w-full border-primary lg:w-auto`}
                    size={`lg`}
                    isLeftIconVisible
                    icon={<Image src={uploadIcon} width={16} height={16} alt="export" />}
                  >
                    Export
                  </CustomButton>
                </section>
                <section>
                  <DashboardTable
                    data={products}
                    columns={columns}
                    currentPage={paginationMeta?.current_page}
                    totalPages={paginationMeta?.last_page}
                    itemsPerPage={paginationMeta?.per_page}
                    onPageChange={handlePageChange}
                    rowActions={rowActions}
                    showPagination
                  />
                </section>
              </>
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
