"use client";

import { useEffect, useState, useTransition } from "react";

import "swiper/css";
import "swiper/css/pagination";

import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import Loading from "~/app/Loading";
import { UniversalSwiper } from "~/components/common/carousel";
import { Wrapper } from "~/components/layout/wrapper";
import { AppService } from "~/services/app.service";
import { CardComponent } from "../../_components/product-card";

export const BestSellingProduct = ({ appService }: { appService: AppService }) => {
  const [isPending, startTransition] = useTransition();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    startTransition(async () => {
      const productsData = await appService.getAllProducts();
      if (productsData) {
        setProducts(productsData?.data);
      }
    });
  }, [appService]);

  if (isPending) {
    return <Loading text="Loading trending products..." className="h-fit w-full p-20" />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No trending products at the moment."
        description="There are no best sellign product yet."
        images={[]}
      />
    );
  }

  return (
    <Wrapper>
      <section className={`mb-6`}>
        <h1 className="text-xl lg:text-3xl">Trending Products</h1>
      </section>

      <UniversalSwiper
        className={`mb-20`}
        items={products}
        renderItem={(product) => (
          <CardComponent
            productID={product.slug}
            image={typeof product.thumbnail === "string" ? product.thumbnail : ""}
            heading={product.title}
            price={product.price}
            publisher={product.publisher?.name || "Unknown Publisher"}
            aggrRating={product.avg_rating}
            discountPrice={product.discount_price}
          />
        )}
        swiperOptions={{
          spaceBetween: 24,
        }}
        showPagination
        showNavigation
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      />
    </Wrapper>
  );
};
