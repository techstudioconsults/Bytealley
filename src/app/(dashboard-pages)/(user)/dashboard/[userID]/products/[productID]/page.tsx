"use client";

import { useEffect, useState, useTransition } from "react";

import { BackNavigator } from "~/app/(dashboard-pages)/_components/back-navigator";
import { DashboardTable } from "~/app/(dashboard-pages)/_components/dashboard-table";
import { TableHeaderInfo } from "~/app/(dashboard-pages)/_components/table-header-info";
import Loading from "~/app/Loading";
import CustomButton from "~/components/common/common-button/common-button";
import { withDependency } from "~/HOC/withDependencies";
import { ProductService } from "~/services/product.service";
import { singleProductCustomerColumns } from "~/utils/constants";
import { dependencies } from "~/utils/dependencies";
import { formatDate, formatTime } from "~/utils/utils";

const BasePreviewProductDetailsPage = ({
  params,
  productService,
}: {
  params: { productID: string };
  productService: ProductService;
}) => {
  const [isPending, startTransition] = useTransition();
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [productOrders, setProductsOrders] = useState<IProductOrderFlat[]>([]);

  useEffect(() => {
    const productData = () => {
      startTransition(async () => {
        const [product, orders] = await Promise.all([
          productService.getProductById(params.productID),
          productService.getProductOrderByProductId(params.productID),
        ]);
        if (product && orders) {
          setProduct(product);
          setProductsOrders(
            orders.flatMap((order) => [
              {
                name: order.customer.name,
                email: order.customer.email,
                quantity: order.quantity,
                date: `${formatDate(order.created_at)} ${formatTime(order.created_at)}`,
              },
            ]),
          );
        }
      });
    };
    productData();
  }, [params.productID, productService]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <section className={`space-y-6`}>
      <section className={`flex flex-col justify-between space-y-4 md:flex-row md:space-y-0 lg:items-center`}>
        <BackNavigator text={`Products Details`} />
        <div className={`flex items-center space-x-4`}>
          <CustomButton
            variant="outline"
            size={`lg`}
            className={`w-full border-destructive text-destructive lg:w-auto`}
          >
            Delete
          </CustomButton>
          <CustomButton variant={`primary`} size={`lg`} className={`w-full lg:w-auto`}>
            Unpublish to Draft
          </CustomButton>
        </div>
      </section>
      <section>
        <p className={`mb-4 text-lg font-semibold`}>{product?.title}</p>
        <TableHeaderInfo headers={["Publish Date", "Price", "Product Link", "Status"]} product={product} />
      </section>
      <section>
        <DashboardTable data={productOrders} columns={singleProductCustomerColumns} />
      </section>
    </section>
  );
};

const ProductDetailsPage = withDependency(BasePreviewProductDetailsPage, {
  productService: dependencies.PRODUCT_SERVICE,
});

export default ProductDetailsPage;
