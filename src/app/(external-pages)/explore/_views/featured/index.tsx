"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import Loading from "~/app/Loading";
import { Wrapper } from "~/components/layout/wrapper";
import { AppService } from "~/services/app.service";
import { CardComponent } from "../../_components/product-card";

export const FeaturedProducts = ({ appService }: { appService: AppService }) => {
  const router = useRouter();
  const [isPendingProducts, startTransitionProducts] = useTransition();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta | null>(null);
  //   const [status, setStatus] = useState<string>("all");

  useEffect(() => {
    const parameters: IFilters = {
      page: currentPage,
      ...(status !== "all" && {
        status: status as "digital_product" | "skill_selling",
      }),
    };

    startTransitionProducts(async () => {
      const productsData = await appService.getAllProducts(parameters);
      setProducts(productsData?.data || []);
      setPaginationMeta(productsData?.meta || null);
    });
  }, [appService, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Wrapper>
      {isPendingProducts ? (
        <Loading text={`Loading products data...`} className={`w-fill h-fit p-20`} />
      ) : (
        <section>
          {products.length > 0 ? (
            <section className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4`}>
              {products
                ?.slice() // Create a shallow copy of the products array
                .sort(
                  (a: IProduct, b: IProduct) =>
                    new Date(b.created_at || b.created_at).getTime() - new Date(a.created_at || a.created_at).getTime(),
                ) // Sort by recency
                .map((product) => (
                  <CardComponent
                    key={product?.slug}
                    productID={product?.slug}
                    image={typeof product?.thumbnail === "string" ? product.thumbnail : ""}
                    heading={product?.title}
                    price={product?.price}
                    publisher={product?.publisher || ""}
                    aggrRating={product?.avg_rating}
                    discountPrice={product?.discount_price}
                  />
                ))}
            </section>
          ) : (
            <EmptyState
              title="Create your first product."
              description="Unlock your creative potential and take the first step towards success on our platform. Create your first product today and join our vibrant community of digital creators. Your masterpiece is just a click away!"
              images={[]}
            />
          )}
        </section>
      )}
    </Wrapper>
  );
};
