"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

import CustomButton from "~/components/common/common-button/common-button";
import { RadioCardGroup } from "~/components/common/FormFields";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { withDependency } from "~/HOC/withDependencies";
import { ProductService } from "~/services/product.service";
import { dependencies } from "~/utils/dependencies";
import { ProductForm } from "./_views/product-form";

const Page = ({ productService }: { productService: ProductService }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  const currentTab = searchParameters.get("tab") || "all-products";

  const onTabChange = (value: string) => {
    const parameters = new URLSearchParams(searchParameters);
    parameters.set("tab", value);
    router.replace(`${pathname}?${parameters.toString()}`, { scroll: false });
  };

  return (
    <Tabs value={currentTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-8 flex h-fit w-full flex-col-reverse gap-4 rounded-none border-b bg-transparent p-0 sm:flex-row sm:items-center sm:justify-between lg:h-[58px]">
        <section className="flex h-full w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap sm:gap-0">
          <TabsTrigger
            value="all-products"
            className="relative h-full min-w-[100px] shrink-0 rounded-none border-transparent px-3 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none sm:px-4"
          >
            Product Details
            <span
              className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 bg-primary transition-transform duration-200 data-[state=active]:scale-x-100"
              data-state={currentTab === "all-products" ? "active" : "inactive"}
            />
          </TabsTrigger>
          <TabsTrigger
            value="live"
            className="relative h-full min-w-[80px] shrink-0 rounded-none border-transparent px-3 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none sm:px-4"
          >
            Preview
            <span
              className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 bg-primary transition-transform duration-200 data-[state=active]:scale-x-100"
              data-state={currentTab === "live" ? "active" : "inactive"}
            />
          </TabsTrigger>
          <TabsTrigger
            value="drafts"
            className="relative h-full min-w-[80px] shrink-0 rounded-none border-transparent px-3 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none sm:px-4"
          >
            Share
            <span
              className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 bg-primary transition-transform duration-200 data-[state=active]:scale-x-100"
              data-state={currentTab === "drafts" ? "active" : "inactive"}
            />
          </TabsTrigger>
        </section>
        <section className="flex w-full items-center justify-end gap-4 sm:w-auto">
          <CustomButton variant="outline" size="lg" className="w-full border-destructive text-destructive sm:w-auto">
            Cancel
          </CustomButton>
          <CustomButton variant="primary" size="lg" className="w-full sm:w-auto">
            Save & Continue
          </CustomButton>
        </section>
      </TabsList>

      {/* tab content */}
      <TabsContent value="all-products">
        <ProductForm />
      </TabsContent>
      <TabsContent value="live">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem culpa ullam, fuga nobis, sequi eos maiores
      </TabsContent>
      <TabsContent value="drafts">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem culpa ullam, fuga nobis, sequi eos maiores
        blanditiis doloremque nihil aperiam ut repellat quidem possimus, vel voluptatibus ea laudantium molestias
        repudiandae.
      </TabsContent>
    </Tabs>
  );
};

const NewProductsPage = withDependency(Page, {
  productService: dependencies.PRODUCT_SERVICE,
});

export default NewProductsPage;
