"use client";

import { useEffect, useState, useTransition } from "react";

import { BackNavigator } from "~/app/(dashboard-pages)/_components/back-navigator";
import { TableHeaderInfo } from "~/app/(dashboard-pages)/_components/table-header-info";
import Loading from "~/app/Loading";
import CustomButton from "~/components/common/common-button/common-button";
import { withDependency } from "~/HOC/withDependencies";
import { ProductService } from "~/services/product.service";
import { dependencies } from "~/utils/dependencies";

const BasePreviewProductDetailsPage = ({
  params,
  productService,
}: {
  params: { productID: string };
  productService: ProductService;
}) => {
  const [isPending, startTransition] = useTransition();
  const [product, setProduct] = useState<IProduct>({} as IProduct);

  useEffect(() => {
    const productData = () => {
      startTransition(async () => {
        const product = await productService.getProductById(params.productID);
        if (product) {
          setProduct(product);
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
        <p className={`text-lg font-semibold`}>{product?.title}</p>
        <TableHeaderInfo headers={["Publish Date", "Price", "Product Link", "Status"]} product={product} />
      </section>
    </section>
  );
};

const ProductDetailsPage = withDependency(BasePreviewProductDetailsPage, {
  productService: dependencies.PRODUCT_SERVICE,
});

export default ProductDetailsPage;
