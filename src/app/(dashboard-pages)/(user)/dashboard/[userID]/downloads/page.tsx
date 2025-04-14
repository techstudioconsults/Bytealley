"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import Loading from "~/app/Loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { WithDependency } from "~/HOC/withDependencies";
import { ProductService } from "~/services/product.service";
import { dependencies } from "~/utils/dependencies";
import { AllDownloads } from "./_views/all-downloads";
import { DigitalProducts } from "./_views/digital-products";
import { SkillSelling } from "./_views/skill-selling";

const Page = ({ productService }: { productService: ProductService }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [productTypes, setProductTypes] = useState<ICategory[]>([]);

  const currentTab = searchParameters.get("tab") || "all-downloads";

  const onTabChange = (value: string) => {
    const parameters = new URLSearchParams(searchParameters);
    parameters.set("tab", value);
    router.replace(`${pathname}?${parameters.toString()}`, { scroll: false });
  };

  useEffect(() => {
    startTransition(async () => {
      const productTypes = await productService.getProductTypesAndCategories();
      setProductTypes(productTypes?.data || []);
    });
  }, [productService]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <Tabs value={currentTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="border-bottom mb-8 flex h-fit w-full flex-col-reverse gap-4 rounded-none bg-transparent p-0 sm:h-[58px] sm:flex-row sm:items-center sm:justify-between lg:h-[58px]">
        <section className="flex h-full w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap sm:gap-0">
          <TabsTrigger
            value="all-downloads"
            className="relative h-full min-w-[100px] shrink-0 rounded-none border-transparent px-3 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none sm:px-4"
          >
            All Downloads
            <span
              className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 bg-primary transition-transform duration-200 data-[state=active]:scale-x-100"
              data-state={currentTab === "all-downloads" ? "active" : "inactive"}
            />
          </TabsTrigger>
          {productTypes.map((productType) => (
            <TabsTrigger
              key={productType.name}
              value={productType.name}
              className="relative h-full min-w-[100px] shrink-0 rounded-none border-transparent px-3 text-sm capitalize data-[state=active]:bg-transparent data-[state=active]:shadow-none sm:px-4"
            >
              {productType.name.replace("_", " ")}
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 bg-primary transition-transform duration-200 data-[state=active]:scale-x-100"
                data-state={currentTab === productType.name ? "active" : "inactive"}
              />
            </TabsTrigger>
          ))}
        </section>
      </TabsList>

      {/* tab content */}
      <TabsContent value="all-downloads">
        <AllDownloads service={productService} />
      </TabsContent>
      {productTypes.map((productType) => (
        <TabsContent key={productType.name} value={productType.name}>
          {productType.name === "digital_product" && <DigitalProducts service={productService} />}
          {productType.name === "skill_selling" && <SkillSelling service={productService} />}
        </TabsContent>
      ))}
    </Tabs>
  );
};

const DownloadPage = WithDependency(Page, {
  productService: dependencies.PRODUCT_SERVICE,
});

export default DownloadPage;
