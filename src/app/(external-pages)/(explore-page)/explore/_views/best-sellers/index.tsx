"use client";

import { useEffect, useState, useTransition } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import Loading from "~/app/Loading";
import { Wrapper } from "~/components/layout/wrapper";
import { AppService } from "~/services/app.service";
import { CardComponent } from "../../_components/product-card";

export const BestSellingProduct = ({ appService }: { appService: AppService }) => {
  const [isPending, startTransition] = useTransition();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  // const searchParameters = useSearchParams();
  // const category = searchParameters.get("category") || "all";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    startTransition(async () => {
      const productsData = await appService.getAllProducts();
      if (productsData) {
        setProducts(productsData?.data);
      }
      // const filteredProducts = productsData?.data || [];

      // if (category === "all") {
      //   setProducts(filteredProducts);
      // } else {
      //   setProducts(filteredProducts.filter((product) => product.product_type.replace("_", "-") === category));
      // }
    });
  }, [appService]);

  const renderCards = products.map((product) => (
    <SwiperSlide key={product.slug}>
      <CardComponent
        productID={product.slug}
        image={typeof product.thumbnail === "string" ? product.thumbnail : ""}
        heading={product.title}
        price={product.price}
        publisher={product.publisher?.name || "Unknown Publisher"}
        aggrRating={product.avg_rating}
        discountPrice={product.discount_price}
      />
    </SwiperSlide>
  ));

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

      <Swiper
        spaceBetween={24}
        slidesPerView={isMobile ? 1 : 4}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="w-full"
      >
        {renderCards}
        <div className="py-5"></div>
      </Swiper>
    </Wrapper>
  );
};
