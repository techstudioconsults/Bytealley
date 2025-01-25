import empty4 from "@/images/empty_img_4.svg";
import { format } from "date-fns";
import { useEffect, useState, useTransition } from "react";
import { DateRange } from "react-day-picker";

import { DashboardTable } from "~/app/(dashboard-pages)/_components/dashboard-table";
import { DateRangePicker } from "~/app/(dashboard-pages)/_components/date-range-picker";
import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import Loading from "~/app/Loading";
import { useDebounce } from "~/hooks/use-debounce";
import { ProductService } from "~/services/product.service";
import { productColumns, rowActions } from "~/utils/constants";

export const DeletedProducts = ({ productService }: { productService: ProductService }) => {
  const [isPendingDeletedProducts, startTransitionDeletedProducts] = useTransition();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const debouncedDateRange = useDebounce(dateRange);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setCurrentPage(1);
  };

  useEffect(() => {
    const parameters: IProductFilters = {
      page: currentPage,
      ...(debouncedDateRange?.from && { start_date: format(debouncedDateRange.from, "yyyy-MM-dd") }),
      ...(debouncedDateRange?.to && { end_date: format(debouncedDateRange.to, "yyyy-MM-dd") }),
      status: "deleted",
    };

    startTransitionDeletedProducts(async () => {
      const productsData = await productService.getAllProducts(parameters);
      setProducts(productsData?.data || []);
      setPaginationMeta(productsData?.meta || null);
    });
  }, [currentPage, debouncedDateRange, productService]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className={`space-y-4`}>
      {isPendingDeletedProducts ? (
        <Loading text={`Loading deleted product table...`} className={`w-fill h-fit p-20`} />
      ) : (
        <>
          <section className={`flex flex-col justify-between lg:flex-row lg:items-center`}>
            <div className={`flex flex-col gap-4 lg:flex-row lg:items-center`}>
              <DateRangePicker className={`w-full lg:w-auto`} onDateChange={handleDateRangeChange} />
            </div>
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
                rowActions={rowActions}
                showPagination
              />
            </section>
          ) : (
            <EmptyState
              images={[{ src: empty4.src, alt: "Empty published product", width: 1136, height: 220 }]}
              title="No deleted products yet."
              description="No deleted products to be found! Your creations are safe and sound on our platform. If you need any assistance or have questions, please don't hesitate to reach out. We're here to support you and your digital journey!"
            />
          )}
        </>
      )}
    </section>
  );
};
