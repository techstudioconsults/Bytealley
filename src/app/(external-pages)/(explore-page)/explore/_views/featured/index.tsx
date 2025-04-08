"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import Loading from "~/app/Loading";
import { Wrapper } from "~/components/layout/wrapper";
import { AppService } from "~/services/app.service";
import { CardComponent } from "../../_components/product-card";

export const FeaturedProducts = ({ appService }: { appService: AppService }) => {
  const [isPendingProducts, startTransitionProducts] = useTransition();
  const [products, setProducts] = useState<IProduct[]>([]);
  const searchParameters = useSearchParams();
  const category = searchParameters.get("category") || "all";

  useEffect(() => {
    startTransitionProducts(async () => {
      const productsData = await appService.getAllProducts();
      const filteredProducts = productsData?.data || [];

      if (category === "all") {
        setProducts(filteredProducts);
      } else {
        setProducts(filteredProducts.filter((product) => product.product_type.replace("_", "-") === category));
      }
    });
  }, [appService, category]);

  return (
    <Wrapper>
      <section>
        <h1 className="text-h3 sm:text-h3-sm md:text-h3-md">Featured</h1>
      </section>
      <section>
        {isPendingProducts ? (
          <Loading text="Loading available products..." className="h-fit w-full p-20" />
        ) : (
          <section className="mb-10 mt-6">
            {products.length > 0 ? (
              <>
                <section className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
                  {[...products]
                    .sort(
                      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(), // Sort by recency
                    )
                    .map((product) => (
                      <CardComponent
                        key={product.slug}
                        productID={product.slug}
                        image={typeof product.thumbnail === "string" ? product.thumbnail : ""}
                        heading={product.title}
                        price={product.price}
                        publisher={product.publisher?.name || "Unknown Publisher"}
                        aggrRating={product.avg_rating}
                        discountPrice={product.discount_price}
                      />
                    ))}
                </section>
              </>
            ) : (
              <EmptyState
                title="No products found."
                description="There are no products available for the selected category."
                images={[]}
              />
            )}
          </section>
        )}
      </section>
    </Wrapper>
  );
};
