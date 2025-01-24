"use client";

import nairaIcon from "@/icons/naira.svg";
import refreshIcon from "@/icons/Property_2_Update_ojnsf7.svg";
import uploadIcon from "@/icons/Property_2_Upload_cm42yb.svg";
import productImage from "@/images/empty_product.svg";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";

import { AnalyticsCard } from "~/app/(dashboard-pages)/_components/analytics-card/index";
import { DashboardTable } from "~/app/(dashboard-pages)/_components/dashboard-table";
import { DateRangePicker } from "~/app/(dashboard-pages)/_components/date-range-picker";
import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import { SelectDropdown } from "~/app/(dashboard-pages)/_components/select-dropdown";
import CustomButton from "~/components/common/common-button/common-button";

type SalesData = {
  orderId: string;
  product: string;
  price: string;
  customer_email: string;
  date: string;
};

export const ActiveUser = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const columns: ColumnDef<SalesData>[] = [
    {
      header: "Product",
      accessorKey: "product",
      render: (value) => (
        <div className={`flex items-center gap-2`}>
          <Image
            src={productImage}
            alt="product"
            width={44}
            height={44}
            className={`h-[44px] w-[44px] rounded-md bg-low-grey-III`}
          />
          <span>{value}</span>
        </div>
      ),
    },
    { header: "Price", accessorKey: "price" },
    { header: "Customer Email", accessorKey: "customer_email" },
    { header: "Date", accessorKey: "date" },
  ];

  const dummyData = Array.from({ length: 10 })
    .fill(null)
    .map((_, index) => ({
      orderId: `ORD${String(index + 1).padStart(4, "0")}`,
      product: `Product ${index + 1}`,
      customer_email: `Customer ${index + 1}`,
      date: format(new Date(2024, 0, index + 1), "MMM dd, yyyy"),
      price: `₦${(Math.random() * 10_000).toFixed(2)}`,
    }));

  return (
    <>
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
            value={50_000}
            valuePrefix={`NGN`}
            icon={<Image src={nairaIcon} alt="naira" width={40} height={40} />}
            backgroundImage={"/images/analytic_bg_0.svg"}
            className={`col-span-1 sm:col-span-2 lg:col-span-6`}
          />
          <AnalyticsCard
            title="Total Revenue"
            value={50_000}
            valuePrefix={`NGN`}
            icon={<Image src={nairaIcon} alt="naira" width={40} height={40} />}
            backgroundImage={"/images/analytic_bg_1.svg"}
            className={`col-span-1 sm:col-span-2 lg:col-span-6`}
          />
          <AnalyticsCard title="New Orders" value={50_000} className={`col-span-1 lg:col-span-4`} />
          <AnalyticsCard title="New Orders Revenue" value={50_000} className={`col-span-1 lg:col-span-4`} />
          <AnalyticsCard title="Total Products" value={50_000} className={`col-span-1 lg:col-span-4`} />
        </section>
      </section>
      <section className={`mt-10`}>
        {dummyData.length > 0 ? (
          <>
            <h6 className="mb-4 text-lg font-semibold">Sales</h6>
            <DashboardTable
              data={dummyData}
              columns={columns}
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
