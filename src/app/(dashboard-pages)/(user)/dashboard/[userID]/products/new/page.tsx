"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

import CustomButton from "~/components/common/common-button/common-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { withDependency } from "~/HOC/withDependencies";
import { ProductFormSchema } from "~/schemas";
import { ProductService } from "~/services/product.service";
import { dependencies } from "~/utils/dependencies";
import { Toast } from "~/utils/notificationManager";
import { ProductForm } from "./_views/product-form";

const Page = ({ params, productService }: { params: { userID: string }; productService: ProductService }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  const currentTab = searchParameters.get("tab") || "product-details";

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      product_type: "",
      title: "",
      category: "",
      price: 0,
      discount_price: 0,
      description: "",
      assets: [],
      cover_photos: [],
      highlights: [],
      thumbnail: null,
      resource_link: [],
      portfolio_link: "",
      tags: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: ProductFormValues) => {
    const commonFields = {
      product_type: data.product_type,
      title: data.title,
      category: data.category,
      price: data.price,
      discount_price: data.discount_price,
      description: data.description,
      cover_photos: data.cover_photos,
      thumbnail: data.thumbnail,
      highlights: data.highlights,
      tags: data.tags,
    };

    const productSpecificFields =
      data.product_type === "digital_product"
        ? { assets: data.assets }
        : {
            resource_link: data.resource_link,
            portfolio_link: data.portfolio_link,
          };

    const productData = { ...commonFields, ...productSpecificFields };

    const productId = await productService.createProduct(productData);

    Toast.getInstance().showToast({
      title: "Success",
      description: `Product "${data.title}" created successfully!`,
      variant: "success",
    });
    router.push(`/dashboard/${params.userID}/products/new?tab=preview&product_id=${productId}`);
  };

  const onCancel = () => {
    methods.reset();
    // router.back(); // Redirect to the dashboard or previous page
  };

  const onTabChange = (value: string) => {
    const parameters = new URLSearchParams(searchParameters);
    parameters.set("tab", value);
    router.replace(`${pathname}?${parameters.toString()}`, { scroll: false });
  };

  return (
    <FormProvider {...methods}>
      <Tabs value={currentTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="mb-8 flex h-fit w-full flex-col-reverse gap-4 rounded-none border-b bg-transparent p-0 sm:flex-row sm:items-center sm:justify-between lg:h-[58px]">
          <section className="flex h-full w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap sm:gap-0">
            <TabsTrigger
              disabled
              value="product-details"
              className="relative h-full min-w-[100px] shrink-0 rounded-none border-transparent px-3 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none sm:px-4"
            >
              Product Details
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 bg-primary transition-transform duration-200 data-[state=active]:scale-x-100"
                data-state={currentTab === "product-details" ? "active" : "inactive"}
              />
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="preview"
              className="relative h-full min-w-[80px] shrink-0 rounded-none border-transparent px-3 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none sm:px-4"
            >
              Preview
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 bg-primary transition-transform duration-200 data-[state=active]:scale-x-100"
                data-state={currentTab === "preview" ? "active" : "inactive"}
              />
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="share"
              className="relative h-full min-w-[80px] shrink-0 rounded-none border-transparent px-3 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none sm:px-4"
            >
              Share
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 bg-primary transition-transform duration-200 data-[state=active]:scale-x-100"
                data-state={currentTab === "share" ? "active" : "inactive"}
              />
            </TabsTrigger>
          </section>
          <section className="flex w-full items-center justify-end gap-4 sm:w-auto">
            <CustomButton
              variant="outline"
              size="lg"
              className="w-full border-destructive text-destructive sm:w-auto"
              onClick={onCancel}
              isDisabled={isSubmitting}
            >
              Cancel
            </CustomButton>
            <CustomButton
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleSubmit(onSubmit)}
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Save & Continue
            </CustomButton>
          </section>
        </TabsList>

        {/* tab content */}
        <TabsContent value="product-details">
          <ProductForm methods={methods} />
        </TabsContent>
        <TabsContent value="preview">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem culpa ullam, fuga nobis, sequi eos maiores
        </TabsContent>
        <TabsContent value="share">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem culpa ullam, fuga nobis, sequi eos maiores
          blanditiis doloremque nihil aperiam ut repellat quidem possimus, vel voluptatibus ea laudantium molestias
          repudiandae.
        </TabsContent>
      </Tabs>
    </FormProvider>
  );
};

const NewProductsPage = withDependency(Page, {
  productService: dependencies.PRODUCT_SERVICE,
});

export default NewProductsPage;
