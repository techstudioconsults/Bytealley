"use client";

import { useEffect, useState, useTransition } from "react";

import { AnalyticsCard } from "~/app/(dashboard-pages)/_components/analytics-card";
import { BackNavigator } from "~/app/(dashboard-pages)/_components/back-navigator";
import { DashboardTable } from "~/app/(dashboard-pages)/_components/dashboard-table";
import { customerColumns, latestPurchaseColumns } from "~/app/(dashboard-pages)/_components/dashboard-table/table-data";
import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import { TableHeaderInfo } from "~/app/(dashboard-pages)/_components/table-header-info";
import Loading from "~/app/Loading";
import { WithDependency } from "~/HOC/withDependencies";
import { CustomerService } from "~/services/customer.service";
import { dependencies } from "~/utils/dependencies";

const BaseCustomerDetailsPage = ({
  params,
  customerService,
}: {
  params: { customerID: string };
  customerService: CustomerService;
}) => {
  const [isPending, startTransition] = useTransition();
  const [customer, setCustomer] = useState<ICustomer | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      startTransition(async () => {
        const customer = await customerService.getCustomerById(params.customerID);
        setCustomer(customer?.data || null);
      });
    };

    fetchProductData();
  }, [customerService, params.customerID]);

  if (isPending) {
    return <Loading text={`Loading customer details...`} className={`w-fill h-fit p-20`} />;
  }

  if (!customer) {
    return (
      <EmptyState
        title="Customer Not Found"
        description="The customer you are looking for does not exist."
        images={[]}
        className="h-full"
      />
    );
  }

  return (
    <section className="space-y-6">
      <section className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0 lg:items-center">
        <BackNavigator text="Customer Details" />
      </section>

      <section></section>

      <p className="text-lg font-semibold">{customer.name}</p>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section>
          <TableHeaderInfo
            headers={["Email Address", "Joined"]}
            product={{
              email: customer?.email,
              joined: customer?.joined,
            }}
          />
          <section className="mt-2 grid h-fit grid-cols-1 gap-4 lg:grid-cols-2">
            <AnalyticsCard title="Total Orders" value={customer?.total_order} />
            <AnalyticsCard title="Total Transactions" value={`₦${customer?.total_transactions.toLocaleString()}`} />
            {/* <AnalyticsCard title="Total Sales" value={customer?.free_products} />
            <AnalyticsCard title="Total Value" value={`₦${customer?.sale_products.toLocaleString()}`} /> */}
          </section>
        </section>
        <DashboardTable data={[customer]} columns={latestPurchaseColumns} />
      </section>
    </section>
  );
};

// Wrap the component with dependencies
const CustomerDetailsPage = WithDependency(BaseCustomerDetailsPage, {
  customerService: dependencies.CUSTOMER_SERVICE,
});

export default CustomerDetailsPage;
