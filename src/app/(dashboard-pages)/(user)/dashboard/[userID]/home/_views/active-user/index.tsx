"use client";

import nairaIcon from "@/icons/naira.svg";
import refreshIcon from "@/icons/Property_2_Update_ojnsf7.svg";
import uploadIcon from "@/icons/Property_2_Upload_cm42yb.svg";
import productImage from "@/images/empty_product.svg";
import { format } from "date-fns";
import Image from "next/image";
import React, { useState } from "react";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";

import { AnalyticsCard } from "~/app/(dashboard-pages)/_components/analytics-card/index";
import { DashboardTable } from "~/app/(dashboard-pages)/_components/dashboard-table";
import { DateRangePicker } from "~/app/(dashboard-pages)/_components/date-range-picker";
import { SelectDropdown } from "~/app/(dashboard-pages)/_components/select-dropdown";
import CustomButton from "~/components/common/common-button/common-button";
import { Badge } from "~/components/ui/badge";
import { AuthService } from "~/services/auth.service";

type SalesData = {
  orderId: string;
  product: string;
  customer: string;
  date: string;
  amount: string;
  status: string;
};

export const ActiveUser = ({ authService, params }: { authService: AuthService; params: { userID: string } }) => {
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
    { header: "Customer", accessorKey: "customer" },
    { header: "Date", accessorKey: "date" },
    { header: "Amount", accessorKey: "amount" },
    {
      header: "Status",
      accessorKey: "status",
      render: (value) => {
        const statusStyles = {
          Completed: "bg-green-100 text-green-800",
          Pending: "bg-yellow-100 text-yellow-800",
          Processing: "bg-blue-100 text-blue-800",
        };
        return <Badge className={`${statusStyles[value as keyof typeof statusStyles]}`}>{value}</Badge>;
      },
    },
  ];

  const dummyData = Array(10)
    .fill(null)
    .map((_, index) => ({
      orderId: `ORD${String(index + 1).padStart(4, "0")}`,
      product: `Product ${index + 1}`,
      customer: `Customer ${index + 1}`,
      date: format(new Date(2024, 0, index + 1), "MMM dd, yyyy"),
      amount: `₦${(Math.random() * 10000).toFixed(2)}`,
      status: ["Completed", "Pending", "Processing"][Math.floor(Math.random() * 3)],
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
          <AnalyticsCard title="New Orders" value={50000} className={`col-span-1 lg:col-span-4`} />
          <AnalyticsCard title="New Orders Revenue" value={50000} className={`col-span-1 lg:col-span-4`} />
          <AnalyticsCard title="Total Products" value={50000} className={`col-span-1 lg:col-span-4`} />
        </section>
      </section>
      <section className={`mt-10`}>
        <h6 className="mb-4 text-lg font-semibold">Sales</h6>
        <DashboardTable
          data={dummyData}
          columns={columns}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={2}
          itemsPerPage={10}
          onRowClick={(row) => console.log("Row clicked:", row)}
        />
      </section>
    </>
  );
};
